## More Detailed Working Experiences (> 5 years ago)
 
### Projects for master’s degree of Computer Science @ NTU
 
 **Project Name:** Interactive Shape Editing
 
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
