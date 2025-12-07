---
sidebar_position: 2
---

# Chapter 2: Describing Your Robot: An Introduction to URDF

## Overview: The Big Idea

Before we can simulate a robot, we need a way to describe it to the simulator. The Unified Robot Description Format (URDF) is an XML-based file format for representing a robot model. In this chapter, you will learn the fundamentals of URDF and how to use it to create a model of a simple robot.

## Key Concepts

*   **Links**: Links are the rigid parts of the robot, such as the body, a wheel, or an arm segment. Each link has a name and can have visual, collision, and inertial properties.
*   **Joints**: Joints connect links together and define how they can move relative to each other. Common joint types include revolute (for rotating joints), prismatic (for sliding joints), and fixed (for rigidly connected links).
*   **Visual, Collision, and Inertial Properties**:
    *   **Visual**: The visual properties of a link define its appearance, including its shape, color, and texture.
    *   **Collision**: The collision properties define the geometry of the link for the purpose of collision detection. This can be a simpler shape than the visual geometry to speed up calculations.
    *   **Inertial**: The inertial properties define the mass and inertia of the link, which are used by the physics engine to simulate its motion.

## Real-World Use Cases

URDF is a fundamental part of the ROS ecosystem and is used in a wide variety of applications.

*   **Simulation**: As we are learning in this module, URDF is used to create models of robots for simulation in Gazebo and other simulators.
*   **Visualization**: Tools like RViz use URDF to display a 3D model of a robot's state.
*   **Kinematics and Dynamics**: URDF is used by kinematics and dynamics solvers to calculate the motion of a robot's joints and links.

## Technical Explanations

### URDF File Structure

A URDF file is an XML file with a single `<robot>` element at its root. Inside the `<robot>` element, you define all of the links and joints of your robot.

Here is a minimal example of a URDF file for a single link:

```xml
<robot name="my_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.03" ixy="0.0" ixz="0.0" iyy="0.03" iyz="0.0" izz="0.03"/>
    </inertial>
  </link>
</robot>
```

This file defines a single link named `base_link` with a box shape for its visual and collision geometry. It also defines its mass and inertia.

To create a more complex robot, you would add more `<link>` and `<joint>` elements. Each `<joint>` element connects two links together and specifies the joint type and its axis of motion.

***Diagram Description***: *A diagram showing a simple two-link robot with a single revolute joint. The diagram shows the `base_link` and the `arm_link`, connected by a `revolute_joint`. The URDF code for this robot is shown next to the diagram.*

## Code Samples

Here is a more complete URDF for a simple two-wheeled robot.

```xml
<robot name="two_wheeled_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.1" radius="0.2"/>
      </geometry>
      <origin xyz="0 0 0.1" rpy="0 0 0"/>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.1" radius="0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
    </inertial>
  </link>

  <link name="left_wheel">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
      <origin xyz="0 0 0" rpy="1.5707 0 0"/>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
      <origin xyz="0 0 0" rpy="1.5707 0 0"/>
    </collision>
    <inertial>
      <mass value="0.2"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002"/>
    </inertial>
  </link>

  <joint name="base_to_left_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel"/>
    <origin xyz="0 0.225 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <link name="right_wheel">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
      <origin xyz="0 0 0" rpy="1.5707 0 0"/>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
      <origin xyz="0 0 0" rpy="1.5707 0 0"/>
    </collision>
    <inertial>
      <mass value="0.2"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002"/>
    </inertial>
  </link>

  <joint name="base_to_right_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="right_wheel"/>
    <origin xyz="0 -0.225 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>
</robot>
```

This URDF defines a robot with a base link and two wheels. The wheels are connected to the base with continuous joints, which are a type of revolute joint with no limits.

## Summary

In this chapter, we have learned about the Unified Robot Description Format (URDF) and how it is used to describe a robot's structure. We have explored the key concepts of links, joints, and their properties. We have also seen how to create a URDF file for a simple robot.

In the next chapter, we will take our URDF model and bring it to life in the Gazebo simulator.
