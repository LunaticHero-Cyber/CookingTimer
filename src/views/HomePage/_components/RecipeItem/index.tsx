import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';

import {Recipe} from '@/types/recipe';

import {styles} from './style';
import Draggable from 'react-native-draggable';

interface RecipeItemProps extends Omit<ViewProps, 'onLayout'> {
  recipe: Recipe;
  currentIndex: number;
  positions: {x: number; y: number}[];
}

const RecipeItem: FunctionComponent<RecipeItemProps> = ({
  recipe,
  positions,
  currentIndex,
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
        {recipe.steps.map(value => {
          const stepDynamicStyle = StyleSheet.create({
            step: {
              width: 100,
              position: 'absolute',

              top: getXOfStep(degrees) + viewLayout.x / 2 - 30,
              left: getYOfStep(degrees) + viewLayout.x / 2 - 50,

              justifyContent: 'center',
            },
          });

          degrees = degrees + eachStepDegrees;

          return (
            <View style={stepDynamicStyle.step}>
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
        x={viewLayout.x / 2 - 40}
        y={viewLayout.y / 2 - 10}
        minX={0}
        minY={0}
        maxX={viewLayout.x}
        maxY={viewLayout.y}
        onDrag={() => setIsDragging(true)}
        onDragRelease={() => setIsDragging(false)}>
        <Text>THIS IMAGE</Text>
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
