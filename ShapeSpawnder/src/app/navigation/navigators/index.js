import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import * as screenNames from "../screen_names"
import CircleSpawnder from "../../features/circle/components";
import SquareSpawnder from "../../features/square/components";
import TriangleSpawnder from "../../features/triangle/components";
import AllSpawnder from "../../features/all/components";

const SpawnderTabbar = createBottomTabNavigator()

const SpawnderNavigator: () => NavigationContainer = () => {
    return (<
        NavigationContainer>
    <SpawnderTabbar.Navigator>
        <SpawnderTabbar.Screen name = {screenNames.SQUARES} component = {SquareSpawnder}/>
        <SpawnderTabbar.Screen name = {screenNames.CIRCLES} component = {CircleSpawnder}/>
        <SpawnderTabbar.Screen name = {screenNames.TRIANGLES} component = {TriangleSpawnder}/>
        <SpawnderTabbar.Screen name = {screenNames.ALL} component = {AllSpawnder}/>
    </SpawnderTabbar.Navigator>
</NavigationContainer>
    )
  };

  export default SpawnderNavigator