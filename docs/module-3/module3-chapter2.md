---
sidebar_position: 2
---

# Chapter 2: First Steps in the Omniverse: Setting Up Isaac Sim and Importing Robot Models

## Overview: The Big Idea

With a foundational understanding of NVIDIA Isaac, it's time to dive into the practical aspects of using Isaac Sim. This chapter will guide you through setting up your Isaac Sim development environment, from installation to launching your first simulation. We will also cover how to import various robot models, including those described using URDF, into the Omniverse environment, preparing them for intelligent control.

## Key Concepts

*   **Omniverse Launcher**: The central hub for managing NVIDIA Omniverse applications, including Isaac Sim. It handles installation, updates, and launching of connected apps.
*   **USD (Universal Scene Description)**: NVIDIA Omniverse's native file format. USD is a powerful, extensible schema for the interchange of 3D graphics data. While Isaac Sim can import URDF, it converts it to USD for its internal representation.
*   **Extensions**: Isaac Sim's functionality is modular, relying heavily on extensions. These are Python modules that add specific features, such as ROS 2 connectivity, various sensors, or AI functionalities.
*   **Nucleus Server**: An Omniverse service that enables collaborative workflows and asset management. It's often used to share USD assets across different Omniverse applications.

## Real-World Use Cases

Setting up Isaac Sim and importing models are fundamental steps for almost any robotics development effort using the platform.

*   **Virtual Robot Prototyping**: Quickly iterate on robot designs by importing URDF models, modifying them within Isaac Sim, and testing their physical behavior.
*   **Simulation for Digital Twins**: Creating accurate digital twins by importing detailed CAD models (often converted to USD) and configuring their physical properties for realistic simulation.
*   **Multi-Robot Simulations**: Importing and orchestrating multiple robot models within a single, complex environment for swarm robotics or collaborative tasks.

## Technical Explanations

### Isaac Sim Installation and Launch

1.  **Install Omniverse Launcher**: Download and install the NVIDIA Omniverse Launcher from the NVIDIA website.
2.  **Install Isaac Sim**: From the Omniverse Launcher, navigate to the "Exchange" tab and install the latest version of Isaac Sim.
3.  **Launch Isaac Sim**: Once installed, launch Isaac Sim from the Omniverse Launcher's "Library" tab.

### Importing Robot Models (URDF to USD)

Isaac Sim natively operates on USD files. While you can directly import URDF files, Isaac Sim converts them to USD under the hood. You can import URDF models through the Isaac Sim GUI or programmatically via Python scripts.

**Steps (GUI-based):**

1.  Launch Isaac Sim.
2.  Go to `File -> Import -> URDF`.
3.  Navigate to your URDF file and select it. Isaac Sim will then present options for how to import the model (e.g., joint drive settings, collision properties).

**Programmatic Import (Python Snippet):**

```python
from omni.isaac.core.utils.nucleus import get_assets_root_path
from omni.isaac.urdf import _urdf
from omni.isaac.core import World

# Initialize the world
world = World(stage_units_in_meters=1.0)
world.scene.add_default_ground_plane()
world.scene.add_light_prim()

# Get the path to a sample URDF asset
assets_root_path = get_assets_root_path()
asset_path = assets_root_path + "/Isaac/Robots/Franka/franka_alt_fingers.urdf"

# Import the URDF
urdf_converter = _urdf.URDFConverter()
urdf_converter.import_urdf(
    urdf_path=asset_path,
    import_path="/World/Franka",
    # Set other import options as needed
)

world.reset()
```

### Understanding USD Structure

When a URDF is imported, it's converted into a USD stage. Understanding basic USD concepts like Prims (primitives), Stages, and Layers is beneficial for advanced customization. Each link and joint from your URDF will typically correspond to a Prim in the USD hierarchy.

***Diagram Description***: *A simplified hierarchy diagram showing a USD stage. At the root is "/World". Underneath are Prims like "/World/Franka" (representing the imported robot). Under "/World/Franka" are child Prims for each link (e.g., "link0", "link1") and joint ("joint0", "joint1").*

## Code Samples

For a complete setup, you would typically write a Python script that launches Isaac Sim headless (without GUI) or configures it, imports models, and sets up your simulation scenario. This programmatic approach allows for automation and integration into larger workflows.

### Basic Isaac Sim Script Structure

```python
from omni.isaac.kit import SimulationApp

# Start the simulation app
# Arguments are specific to your Isaac Sim installation and desired behavior
simulation_app = SimulationApp({"headless": False}) 

from omni.isaac.core import World
from omni.isaac.core.utils.nucleus import get_assets_root_path
from omni.isaac.urdf import _urdf

# Initialize the world
world = World(stage_units_in_meters=1.0)
world.scene.add_default_ground_plane()
world.scene.add_light_prim()

# --- Your code for importing robots, setting up environment, etc. goes here ---
assets_root_path = get_assets_root_path()
asset_path = assets_root_path + "/Isaac/Robots/Franka/franka_alt_fingers.urdf"

urdf_converter = _urdf.URDFConverter()
urdf_converter.import_urdf(
    urdf_path=asset_path,
    import_path="/World/Franka",
)
# -----------------------------------------------------------------------------

world.reset()

# Run the simulation
while simulation_app.is_running():
    world.step(render=True) # Step physics, optionally render
    # You can add logic here to control robots, read sensor data, etc.

simulation_app.close()
```

## Summary

This chapter has provided a practical guide to getting started with NVIDIA Isaac Sim. We covered the installation process, launching the simulator, and the crucial step of importing robot models, particularly focusing on the conversion of URDF to USD. Understanding these initial steps is vital for building any AI-powered robotics simulation.

In the next chapter, we will connect our Isaac Sim environment to ROS 2, enabling us to control our simulated robots using the ROS 2 framework we learned in Module 1.
