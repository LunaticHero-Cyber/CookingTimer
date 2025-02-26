import LottieView from 'lottie-react-native';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import Draggable from 'react-native-draggable';

import {Recipe} from '@/types/recipe';

import {styles} from './style';

interface RecipeItemProps extends Omit<ViewProps, 'onLayout'> {
  recipe: Recipe;
  onPress: () => void;
  onSelectSteps: (selectedSteps: number) => void;
}

const RecipeItem: FunctionComponent<RecipeItemProps> = ({
  recipe,
  onPress,
  onSelectSteps,
  ...attrs
}) => {
  const [viewLayout, setViewLayout] = useState({x: 0, y: 0});
  const {style, ...rest} = attrs;

  const [isDragging, setIsDragging] = useState(false);

  const eachStepDegrees = useMemo(
    () => (Math.PI * 2) / recipe.steps.length,
    [recipe.steps.length],
  );

  const getXOfStep = useCallback((pi: number) => {
    return 60 * Math.cos(pi);
  }, []);

  const getYOfStep = useCallback((pi: number) => {
    return 60 * Math.sin(pi);
  }, []);

  const dynamicStyle = StyleSheet.create({
    recipeName: {
      bottom: 0,
    },
  });

  const StepsView = useMemo(() => {
    let degrees = Math.PI;

    return (
      <>
        {recipe.steps.map((value, index) => {
          const stepDynamicStyle = StyleSheet.create({
            step: {
              width: 100,
              position: 'absolute',

              top: getXOfStep(degrees) + viewLayout.x / 2 - 30,
              left: getYOfStep(degrees) + viewLayout.x / 2 - 50,

              justifyContent: 'center',
            },
          });

          degrees = degrees - eachStepDegrees;

          return (
            <View key={`${value.name}-${index}`} style={stepDynamicStyle.step}>
              <Text style={styles.stepsText}>{value.name}</Text>
            </View>
          );
        })}
      </>
    );
  }, [eachStepDegrees, getXOfStep, getYOfStep, recipe.steps, viewLayout.x]);

  return (
    <View
      style={[styles.container, style]}
      {...rest}
      onLayout={event =>
        setViewLayout({
          x: event.nativeEvent.layout.width,
          y: event.nativeEvent.layout.height,
        })
      }>
      {isDragging ? StepsView : null}

      <Draggable
        shouldReverse
        x={viewLayout.x / 2 - 60}
        y={viewLayout.y / 2 - 40}
        minX={0}
        minY={0}
        maxX={viewLayout.x}
        maxY={viewLayout.y}
        onShortPressRelease={onPress}
        onDrag={(_, gestureState) => {
          if (Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3) {
            setIsDragging(true);
          }
        }}
        onDragRelease={(_, gestureState) => {
          let degrees = Math.PI;
          let degreesList: number[] = [];

          const difference = (a: number, b: number) => {
            var d = Math.abs(a - b);
            return d > Math.PI ? Math.PI * 2 - d : d;
          };

          const closest = (a: number, list: number[]) => {
            var ds = list.map(b => {
              return difference(a, b);
            });
            return ds.indexOf(Math.min.apply(null, ds));
          };

          const releasedRadians = Math.atan2(gestureState.dx, gestureState.dy);

          for (let i = 0; i < recipe.steps.length; i++) {
            degreesList = degreesList.concat(degrees);
            degrees = degrees - eachStepDegrees;
          }
          const selected = closest(releasedRadians, degreesList);

          onSelectSteps(selected);
          setIsDragging(false);
        }}>
        <LottieView
          source={recipe.animation}
          autoPlay
          loop
          style={styles.lottieView}
        />
      </Draggable>

      <Text
        style={[
          styles.recipeName,
          !isDragging ? dynamicStyle.recipeName : null,
        ]}>
        {isDragging ? 'Going to...' : recipe.name}
      </Text>
    </View>
  );
};

export default RecipeItem;
