---
sidebar_position: 5
---

# Chapter 5: Putting It All Together: Building a ROS 2 Application

## Overview: The Big Idea

In the previous chapters, we have learned about the fundamental building blocks of ROS 2: nodes, topics, services, and actions. Now it's time to put all of that knowledge into practice and build a complete ROS 2 application from scratch. In this chapter, we will create a simple application that uses a service to set a goal for the `turtlesim` turtle and then uses a publisher to control the turtle's movement to that goal.

## Key Concepts

This chapter will reinforce the concepts we have already learned and introduce a few new ones:

*   **Launch Files**: Launch files are a way to start up multiple ROS 2 nodes at once. They are written in Python and provide a convenient way to manage complex applications.
*   **Parameters**: Parameters are a way to configure your nodes at runtime without having to recompile them.
*   **Turtlesim**: Turtlesim is a simple and fun simulator that is included with ROS 2. It is a great tool for learning and experimenting with ROS 2 concepts.

## Real-World Use Cases

The application we will build in this chapter is a simplified version of a real-world robotics task. The ability to set a goal and then control a robot to that goal is a fundamental capability for many robotic systems.

*   **Mobile Robot Navigation**: A mobile robot might be given a goal to navigate to a specific location in a warehouse.
*   **Robotic Arm Control**: A robotic arm might be given a goal to move to a specific position to pick up an object.
*   **Drone Flight**: A drone might be given a goal to fly to a specific waypoint.

## Technical Explanations

### Application Architecture

Our application will consist of two nodes:

1.  **Goal Setter Node**: This node will provide a service that allows a user to set a goal position for the turtle.
2.  **Turtle Controller Node**: This node will subscribe to the goal topic and publish velocity commands to the turtle to move it to the goal.

We will also create a launch file to start both nodes and the `turtlesim` simulator at the same time.

***Diagram Description***: *A diagram of the application architecture. There is a "Goal Setter Node" and a "Turtle Controller Node." The Goal Setter Node provides a service called "/set_goal". A user can call this service to set a goal. The Goal Setter Node then publishes the goal to a "/goal" topic. The Turtle Controller Node subscribes to the "/goal" topic and publishes velocity commands to the "/turtle1/cmd_vel" topic. The "turtlesim_node" subscribes to the "/turtle1/cmd_vel" topic and moves the turtle.*

## Code Samples

Here are the code samples for our two nodes and the launch file.

### Goal Setter Node

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Point
from your_package_name.srv import SetGoal

class GoalSetter(Node):

    def __init__(self):
        super().__init__('goal_setter')
        self.publisher_ = self.create_publisher(Point, 'goal', 10)
        self.srv = self.create_service(SetGoal, 'set_goal', self.set_goal_callback)

    def set_goal_callback(self, request, response):
        goal = Point()
        goal.x = request.x
        goal.y = request.y
        goal.z = 0.0
        self.publisher_.publish(goal)
        self.get_logger().info('New goal set: x=%f, y=%f' % (goal.x, goal.y))
        response.success = True
        return response

def main(args=None):
    rclpy.init(args=args)
    goal_setter = GoalSetter()
    rclpy.spin(goal_setter)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Turtle Controller Node

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Point, Twist
from turtlesim.msg import Pose
import math

class TurtleController(Node):

    def __init__(self):
        super().__init__('turtle_controller')
        self.goal_subscription = self.create_subscription(
            Point,
            'goal',
            self.goal_callback,
            10)
        self.pose_subscription = self.create_subscription(
            Pose,
            '/turtle1/pose',
            self.pose_callback,
            10)
        self.velocity_publisher = self.create_publisher(Twist, '/turtle1/cmd_vel', 10)
        self.goal = None
        self.current_pose = None

    def goal_callback(self, msg):
        self.goal = msg

    def pose_callback(self, msg):
        self.current_pose = msg
        if self.goal is not None:
            self.move_to_goal()

    def move_to_goal(self):
        if self.current_pose is None or self.goal is None:
            return
        
        dx = self.goal.x - self.current_pose.x
        dy = self.goal.y - self.current_pose.y
        distance = math.sqrt(dx*dx + dy*dy)

        if distance > 0.1:
            vel_msg = Twist()
            vel_msg.linear.x = 1.5 * distance
            angle_to_goal = math.atan2(dy, dx)
            vel_msg.angular.z = 6.0 * (angle_to_goal - self.current_pose.theta)
            self.velocity_publisher.publish(vel_msg)
        else:
            vel_msg = Twist()
            vel_msg.linear.x = 0.0
            vel_msg.angular.z = 0.0
            self.velocity_publisher.publish(vel_msg)
            self.goal = None

def main(args=None):
    rclpy.init(args=args)
    turtle_controller = TurtleController()
    rclpy.spin(turtle_controller)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Launch File

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='turtlesim',
            executable='turtlesim_node',
            name='turtlesim'
        ),
        Node(
            package='your_package_name',
            executable='goal_setter_node',
            name='goal_setter'
        ),
        Node(
            package='your_package_name',
            executable='turtle_controller_node',
            name='turtle_controller'
        )
    ])
```

## Summary

In this chapter, we have built a complete ROS 2 application from the ground up. We have used our knowledge of nodes, topics, and services to create a simple but functional application that controls the `turtlesim` turtle. We have also learned about launch files and how they can be used to manage complex applications.

This concludes Module 1 of the book. You now have a solid understanding of the fundamentals of ROS 2 and are ready to move on to the next module, where we will learn about creating digital twins of our robots in simulation.
