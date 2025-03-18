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

var bigdecimal = require('bigdecimal');

const RecipeItem: FunctionComponent<RecipeItemProps> = ({
  recipe,
  onPress,
  onSelectSteps,
  ...attrs
}) => {
  const PI = useMemo(
    () => new bigdecimal.BigDecimal('3.141592653589793238462643383279'),
    [],
  );
  const [viewLayout, setViewLayout] = useState({x: 0, y: 0});
  const {style, ...rest} = attrs;

  const [isDragging, setIsDragging] = useState(false);

  const eachStepDegrees = useMemo(
    () => (PI * 2) / recipe.steps.length,
    [PI, recipe.steps.length],
  );

  const getXOfStep = useCallback(
    (pi: number) => {
      return ((viewLayout.x * 80) / 200) * Math.cos(pi);
    },
    [viewLayout.x],
  );

  const getYOfStep = useCallback(
    (pi: number) => {
      return ((viewLayout.x * 80) / 200) * Math.sin(pi);
    },
    [viewLayout.x],
  );

  const dynamicStyle = StyleSheet.create({
    container: {
      height: viewLayout.x,
    },
    recipeName: {
      bottom: 0,
    },
  });

  const StepsView = useMemo(() => {
    let degrees = PI / 2;

    return (
      <>
        {recipe.steps.map((value, index) => {
          const stepDynamicStyle = StyleSheet.create({
            step: {
              position: 'absolute',

              bottom: getYOfStep(degrees) + (viewLayout.x * 80) / 200,
              left: getXOfStep(degrees) + viewLayout.x / 2,
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
  }, [PI, eachStepDegrees, getXOfStep, getYOfStep, recipe.steps, viewLayout.x]);

  const lottieAnimetionJson = useMemo(
    () => JSON.parse(recipe.animation),
    [recipe.animation],
  );

  return (
    <View
      style={[styles.container, style, dynamicStyle.container]}
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
          let degrees = PI;
          let degreesList: number[] = [];

          const difference = (a: number, b: number) => {
            var d = Math.abs(a - b);
            return d > PI ? PI * 2 - d : d;
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
          source={lottieAnimetionJson}
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
        {isDragging ? 'Skip to...' : recipe.name}
      </Text>
    </View>
  );
};

export default RecipeItem;
