## More Projects @ Singapore Office

### V. Pull Request CI/CD System from P4 to Git

In order to share/open source code, new director decides to switch the SCM tool from Perforce to GitHub, we research and design a new Pull Request CI system (PR CI/CD System) which works with Github server. It has the ability of tracing any PR opened by the customer, auto-trigger CI builds on Jenkins Server, get builds status and show them on the developed dashboard, this dashboard also shows commits information included in the Pull Request.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: June 2013-Mar 2015

•	Responsibilities

1.) Research the existed Gate CheckIn CI system based on Github server from internet, learn about their Pros and Cons, and then identify one open-source tool as the base.

2.) Dig out the difference compared to what we expected in PR CI system.

3.) Propose solutions (PR hook of Github server), develop a POST event web service to parse JSON data of PR hook, get necessary commit data information.

4.) Implement the function: Collector auto-triggers CI builds on Jenkins, and traces the CI build status.

5.) Develop a dashboard to show CI build status, Pull Request, committer, branch etc. information.

6.) Implement Email notification function with a very nice format, which includes last CI build status (Pass, Failed), commit ID, dashboard URL, and Jenkins Job log URL.

7.) Output log with standard format by implementing a logging function.

8.) Set up three Linux servers for configuring above Collector, Coordinate Servers, and develop Java functions with Maven on these three Linux servers.

•	Achievement

This system implements the new CI build process from P4 to Github, which will help to migrate the same process to other major products build in near future.



### VI. BRE/ECS – CI/CD Builds for the Data Management Team

We write the PERL+BATCH script by ourselves to decouple Visual Build tool (pay for licenses) used by Data Management Product build process, and deploy the new build process onto Autodesk local Cloud build machine (ECS Vapor), and implement a dashboard for SWD/QA teams usage.

•	Role: PI　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　Time: Nov 2011-June 2013

•	Description

By leveraging the new ECS environment and retooling the Vault build to use standard BRE build scripts and standard build tools BRE was able to successfully meet the requirements from the DM team for a continuous build system for their Vault product line. This is a significant upgrade for the DM team providing a much more modern build system that reduces their cycle time ultimately helping them produce outstanding software, on-time and on-budget.
The Data Management team, who produces our Vault series of products, has only a limited number of build machines located in our Novi office. They recently reached out to the BRE team asking if BRE could setup and support a continuous build system for them. This is a critical need for the team as their existing processes and workflows aren’t capable of catching build errors fast enough. That leads to longer cycle times which are not conducive to produce high quality, robust software.

•	Responsibilities

1.Vault builds use a proprietary build tool called Visual Build.

- More build machines mean more licenses of Visual Build at a cost of $265 per seat.

- Developers are unable to perform full builds because they don’t have enough Visual Build licenses.

- DM team would like to reduce their cycle time but can’t make progress on this effectively given the small amount of build hardware currently available.

2.Continuous builds require additional hardware.
- New machine funding is a costly and time-consuming challenge typically taking weeks to get new build machines ordered, setup and on-line.

- BRE is concerned with the escalating software costs (in terms of cost as well as Visual Build project file maintenance) that more build machines will require.

3.Vault builds use proprietary obfuscation software, Dotfuscator.

- BRE believes this isn’t required for continuous builds, this is mainly for the official builds, and however, BRE does need to take note of this for new integration machines.

- Branch builds are delayed due to lack of hardware and automations.

- BRE receives a lot of branch build requests every week, this requires manual effort in starting the required builds

- With a very limited number of build machines, additional build requests require a much longer wait time to complete.

- Self-service build triggering is also required as BRE cannot trigger all required builds.

•	Achievement

1.Visual Build Tool Decoupling

- This was a BIG obstacle. SWD and BRE need maximum flexibility when more and more builds are required without incurring ever increasing licenses costs.

- This is a non-standard build tool which can be replaced with something more standard.

- Within a 90-day time period ASRD BRE developed and executed a plan to decouple Visual Build from Vault build process and leverage standard scripts completely replacing Visual Build functionalities 

- By mid-July, Kampai (FY14 Vault code name) mainstream integration was built using the new scripts; the DM team and BRE is now free from using Visual Build moving forward.

2.Leverage ECS environment

- In late May ASRD BRE began testing the ECS environment to see if it would satisfy the DM team’s requirements for more builds. These tests were very successful.

- By the end of June ASRD BRE successfully ran Vault builds within the ECS building every change list submitted by the DM team. We’ve successfully achieved our goal of setting up a continuous build system for the DM team.

3.Branch Build Requests

- We develop a web-based build scheduler tool, this is a noteworthy accomplishment; relieving BRE from manually handling branch build requests and providing the engineering team maximum flexibility for their build needs – a true win-win.
