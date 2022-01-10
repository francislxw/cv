## Projects for master’s degree of Computer Science @ NTU
 
 **I.Project Name:** Interactive Shape Editing
 
 **Project Duration:** Aug 2013 ~ July 2014
 
 **Background:**
 
 This project is for my master degree on Digital Media Technology program of Nanyang Technological University, it’s accomplished under my supervisor’s instruction, it utilizes what I learned from DM6101 (Introduction to Computer Graphics) and DM6122 (3D Modeling and Reconstruction).
 
 **Project Description:**
 
 Three-dimensional geometric models are the base data for applications in computer graphics, computer aided design, visualization, multimedia, and other related fields, the state-of-the-art interactive shape editing techniques become very popular in recent years, under such condition, and we propose this dissertation to perform some research on this area.
 
 **My Contributions:**
1. Discuss with advisor, choose the topic, propose catalogues and ask him help to review then refine it.
 
2. Develop a pro-type of the Interactive Shape editing system, which includes open mesh file, create control points, free-form deformation etc. functions.
 
3. Draft contents of each chapter, compose the dissertation, it mainly includes the following contents:
 
* It firstly introduces the background of the interactive shape editing technique, and states the problem in this research area, based on this, we propose the objective and scope of the research, and we draft the organization of this dissertation.
 
* Secondly, we investigate the related works on "Interactive shape editing" and "free-form deformation (FFD)", by reading most relative papers, we know what resolutions have been proposed by most researchers; learn about the Pros and Cons of every solution. In order to deeply understand the popular method 'linearization' used in the deformation, we choose free-form deformation (FFD) approach to perform researching and implementation.
 
* We mainly discuss the detailed implementation of the FFD application, includes the development environment, application’s structure information, the workflow diagrams for displaying model, create control points, free-form deformation, multithreading functions. We also give the relationship diagram of classes that are created in this FFD application and list some C++ pseudo code. During the implementation, we apply several advanced technologies, e.g., apply half edge data structure to store mesh data, which can improve the efficiency of getting vertex local information during deformation; On the basis of vertex local coordinate, we utilize the de Casteljau algorithm, to easily calculate the deformed coordinate with the Burnstein Polynomial form, etc.
 
**Final Result:**
After presenting the output of every function in this FFD application, we perform some discussion on 'how to improve the applicant's performance’ and propose 'multithreading' technique to resolve the 'long time cost in calculating deformed coordinates' issue. Based on the experiment results, we conclude that the 'multithreading' technique can improve the performance of the FFD application very much, especially for large scale models.
Result: The dissertation passed the final review of NTU graduate committee

**Demo**
* free-form-deformation by WebGL [FFD WebGL](./computer-graphics/free-form-deformation)
* FFD - traditional GUI [FFD TGUI](./computer-graphics/ffd-play)
* FFD - drage points summary [FFD Dragpoints](./computer-graphics/ffd-dragpoints)


**II.Project Name:** Direct Reading - Interactive Shape Editing

**Project Duration:** Jan, 2013 ~ July, 2013

**Project Description:**

This report surveys the state-of-the-art techniques for creating, manipulating, editing and analyzing digital geometry models, mainly on computerized modeling of discrete (digital) geometry, in particular polygonal meshes. It is 7,000 to 10,000 words in length using the IEEE two column format. It commences with an abstract and finish with a list of references, contains any headings and subheadings as deemed necessary, and the pages are numbered consecutively using Arabic numerals.

**My Contributions:**

1. Choose five main IEEE papers to perform survey.

*	Free-Form Deformation of Solid Geometric Models;

*	Mesh Editing with Poisson-Based Gradient Field Manipulation;
 
*	Mean Value Coordinates for Closed Triangular Meshes; 
*	Mesh Editing based on Discrete Laplace and Poisson Models; 
*	Differential Coordinates for Interactive Mesh Editing
3. Answer the following questions in the report.
*	How to interactively edit the arbitrary meshes.
*	How to avoid changing the connectivity and positions of vertices.
*	How to efficiently edit on non-linear surface.
*	How to avoid the distortion during the deformation of the shape.
*	How to preserve the local details during deformation.
*	How to avoid the too costly computation in interactive mesh editing.
*	How to invent fast and robust techniques to tackle the complicated models.
*	How to tackle the issue: the vertex neighborhood cannot always define a local frame (due to linear dependency).
*	How to prevent local self-intersection in the reconstructed surface.
4. Learn about a lot of techniques/solutions that are proposed to deal with the challenges listed in the above topics, such as: free-form deformation, re-meshing, multi-resolution, non-linear differential coordinate, detail editing and transfer, non-linear Poisson algorithm, manipulate vertex positions explicitly, non-linear handle-aware isoline technique, Boolean operations, Laplacian smoothing, multi-band decompositions, Laplacian coordinates, Extended Free-Form Deformation.
5. For each paper, described in sections II-VI, we mainly focus on learning its objectives, the technology it involved and presenting some results. And in the section VII, we perform some simple comparison on methods and algorithms involved in each paper, and then give some conclusion in the last section VIII.

**III.Project Name:** 2D and 3D Animation

**Project Duration:** Nov 2011 ~ June 2012

**Project Description:** 

This project is a homework of the Class DM6104 (2D & 3D ANIMATION), based on the interesting story we think of, we create the model with regular polygons by applying the existing characters from internet, then we render the model with Maya renderer (called software render) after researching all hardware and software renders. We use Animation, Character Setup, Human IK to perform animation after studying all chapters of Maya Tutorials. Then we use Autodesk Maya 2013 to implement the simulation of the football kinematics, by drawing spline lines, and use ‘Animate->attach to the path’ in ‘Edit graphic’ UI, we adjust the speed of football in the start, middle and near end points, make the football being moved more realistic. We collect the main background music and pick up other sound’s material (like the football hits the door, beautiful girl’s walk etc.), make the animation more realistic and histrionic. Finally, we use Adobe After Effects CS6.0 (AE CS6) software to make the movie after we get so many vivid *.iff files rendered by Autodesk Maya software.

**My Contributions:**

1. Work with the team members to think of story: “Once upon a time, there was a good soccer player, who trained himself very hard in order to become a legend. But it seems that a key catalyst is needed to release his full power. He does not know what the catalyst is until one day, there is a girl was sacred of his power and ran away. She then lives a peaceful life. The player soon became a legend. There have been numerous accounts of women vying for his affection, even some madly in love with him. He did not have any known relationships. ”

2. We work together to create the model with regular polygons by using the existing characters from internet, and the two characters we chose match our story needs very well. The player looks funny especially when his eyebrow moves, the girl is pretty and dresses sexy. 

3. We perform rendering, in order to deliver the best quality movie, we do research on all Maya renderers, then we know hardware rendering is fast but it highly relies on the graphics card, software rendering is slow but it gives more accurate result. Because Maya hardware renderer with our ATI HD4850 graphic card is quite messy, there is rumor on internet that ATI cards are only good for games, therefore, we choose software renderers. 
    Maya software is acceptable, but the colors and lights are not good. Metal ray is the best. Plus, metal ray supports global illumination. As we know, there is no free lunch. More accurate result comes with more rendering time, especially when rendering particles. We originally want to set the resolution to HD1080 but the machine hangs during we try the first fire effect, which consists of numerous particles. So eventually it took us several whole nights to finish all six scenes. As a result, we don’t want to render again when we want to make small changes to the final animation.  

4. For animation part, by studying all chapters of Maya Tutorials, we find these three chapters: animation, Character Setup, Human IK are very useful for the assignment.
We spent most time on human actions design, watched lots of videos on how football players kick the ball in football games, and how Autodesk Maya 2013 implements human behavior by IK, how to retarget behavior from one model to another, how to loop the behavior through graph editor. Finally, we used Autodesk Maya 2013 to implement the simulation of the football kinematics, by drawing spline lines, and use ‘Animate->attach to the path’ in ‘Edit graphic’ UI, we adjust the speed of football in the start, middle and near end points, make the football being moved more realistic. 

5. For Music and Sound Effect part, we collect the main background music which is very rhythmic to this animation, and other sounds material (like the football hits the door, beautiful girl’s walk etc.) which makes the animation more realistic and histrionic.

6. For Postproduction, we use Adobe After Effects CS6.0 (AE CS6) software to make the movie after we get so many vivid *.iff files rendered by the Autodesk Maya software. By this sub-task, we get the following experience: 
*	The image files (like: JPG) can’t be exported to SWF format file, though we have made so much perfect effects to the pictures, at last we verified it’s a bug of this AE CS6 
*	If you export *.aec files into the AVI files, the exported file’s size is very big (in our case, it’s about 6G), and it always choppy in the sound & pictures during playing AVI file process. 
*	If you export *.aec files into the *.mp4 (H2.6) files, the size of the exported *.mp4 file looks good (only about 50M), and the effect is acceptable during playing *.mp4 process.
*	The Effect functions in the AE CS6 are very plentiful; we made the vivid Title effect by only using small parts of whole Effect functions.
Techniques Used:
Interpolation (curve), Matrix, SVD, Optimization, motion capture, IK, Interpolation (rotation), Dynamics, Behavioral Animation, 3D display, 2D/3D animation appreciation
Autodesk Maya 2013, Adobe After Effects CS6.0 (AE CS6)

**IV.Project Name:** Game Design - Falling Animals

**Project Duration:** Aug, 2013 ~ Dec, 2013

**Project Description:** 
This project is my homework of DM6127 (Introduction to Games Design). The prerequisites of this class are Computer Graphics, Linear Algebra and Programming. We are required to work in our respective teams to design and develop a computer game on Samsung mobile devices under the mentorship of a game organization. Each team has to submit a Game Design Document (GDD). A demonstration of the working game is required.

We need to work out the game and the scale of the content with the mentor organization. Use Unity3D as our game engine to develop our game on Samsung mobile devices that is supported by Unity3D.

The GDD is assessed in the following areas: 
*	Clarity in describing the game’s theme and goal 
*	Creativity in game concept (e.g., not just another FPS) 
*	Systematic development of GDD with the inclusion and description of core components of the game such as (not limited to):
•	Background, objective(s) 
•	Game flow 
•	Game mechanics
•	I/O control and UI interfaces
•	Environment, level, characters
•	Visual and audio effects
•	Game resources, economies
•	System parameters/requirements
•	Unique points about the game and its fun factor or the value it offers
•	Presentation and organization of GDD for easy reading and comprehension  

We are given 10 minutes to pitch our project. Each of us presented a portion of the project. And The Game are assessed in the following areas:
*	Presentation
*	1-3 minutes introduction video
*	How your game play and is enjoyed
*	Recommendation by the Samsung and mentor organizations

**Game Story:**

The pioneer space shuttle that was transporting animals to Mars has failed to reach orbit. Luckily all the poor animals inside have been equipped with parachutes and released out of the shuttle. The government seems to be ignorant of the fates of these animals. You are a representative of a nonprofit animal activist group who have dedicated to save all of them instead. Direct them into safety by landing successfully into your boats! 

**My Contributions:**

1. Discuss with the team members, to propose the Game Outline:
*	Genre: Casual 
*	This is a single player game. 
*	Players would have to direct the incoming animals to the landing spot (boat). During the process, these animals have to evade the obstacles. 
*	There are no levels. The game only ends when player let an animal die. 
*	An animal dies if any of these three conditions occur: it makes a collision with bee, it makes a collision with plant, or it falls into the water. 
*	Player starts out the game having to deliver only a single animal. As the game progresses, the number of animals appearing will increase, obstacles will also appear more often. 

2. And we proposed the Gameplay Flow after the discussion, create a flowchart to explain the gameplay,and generated the detailed Game Design Document (GDD).

3. Develop the wave movement from top to down with Unity3D, which can move left and right.

4. Present this part to reviewers within 3 minutes.

5. It passes the final review.

6. The detailed GDD is as Appendix A [GDD for Game Design]

**Technology Used:**
*	Samsung Mobile Game Challenge and Plugins 
*	Game Development with Unity3D/MM Lab
*	Programming Unity3D and Samsung Unity3D Plugin/MM Lab
*	Game Modeling with 3DS Max/MM
*	Game Design and Workshop
*	Game Rendering and Shaders
*	Game Texture and Optimization
*	Ray Tracing, Collision Detection and Resolution
*	Game Physics and Animation
*	Game Scene and Terrain Management

