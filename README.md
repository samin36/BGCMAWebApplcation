# Delivery Documentation

# Team 0132 – Application Avengers

# 11/22/2020

**Release Notes**

**VERSION**

- BGCMA Web Application 1.0

**NEW FEATURES**

- Ability for parents to sign up and login to Web Portal
- Ability for parents to change their password, if forgotten
- Ability for parents to create a new application for a child
- Ability for parents to save application
- Ability for parents to edit saved application
- Ability for parents to cancel or submit application
- Ability for parents to delete incomplete application
- Ability for admins to sign up and login to Web Portal
- Ability for admins to verify their email, if forgotten
- Ability for admins to change their password, if forgotten
- Ability for admins to view all parents&#39; applications
- Ability for admins to change status of parents&#39; applications
- Ability for admins to view any application

**BUG FIXES**

- Since this is our first release, we have not fixed any previous bugs

**KNOWN BUGS**

- Web Application slows down on some browsers
- Refreshing Web Application while updating data might cause information to be lost/corrupted

**Install Guide**

**PRE-REQUISITES**

- You must have Node.js and Yarn installed.
  - Node.js can be installed from: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  - Node.js comes with a package manager called npm which can be used to install Yarn: [https://yarnpkg.com/getting-started/install](https://yarnpkg.com/getting-started/install)

**DEPENDENCIES**

- The files downloaded from the Github repository include a script to install any necessary dependencies. There is no need to install any third-party software manually besides Node.js and Yarn.

**DOWNLOAD**

- [https://github.com/samin36/BGCMAWebApplication](https://github.com/samin36/BGCMAWebApplication)

**BUILD**

- To build the necessary components of the application:
  - Navigate to the folder containing the downloaded files
  - If you are in the right folder, you should see a file called &quot;package.json&quot;
  - Open the terminal (CMD/Git Bash on Windows), type in &quot;yarn install&quot;, and press Enter
  - If done correctly, yarn will install all the dependencies and build the application

**INSTALLATION**

- Yarn installs the necessary dependencies for Firebase (database) to work, but it is still required for the user to link the application to their Firebase Project.
  - Go to [https://console.firebase.google.com/](https://console.firebase.google.com/) and login using a Google account, if not already.
  - Click on the + icon as shown below
 ![](RackMultipart20201122-4-136nf96_html_25bc9a0a5f90e3aa.png)
  - Enter a project name and click continue
  - Disable the Google Analytics option for the project and click &quot;Create Project&quot;. Once the project is created, click continue.
  - Once on the project homepage, click the angle brackets web icon as highlighted below
 ![](RackMultipart20201122-4-136nf96_html_f06638472a5a77ef.png)
  - Give the web app a nickname. If you wish to host the website using firebase hosting, check the &quot;Also set up Firebase Hosting&quot; option. Click &quot;Register App&quot; after making your choice.

  - C ![](RackMultipart20201122-4-136nf96_html_eec4dcb97867ca60.png) licking &quot;Register App&quot; will show some scripts needed to link the application with firebase. The entire script is not needed, however. Copy the portion shown in the image below.
  - Once copied, open the previously downloaded project files (from Github) and navigate to the _Firebase_ folder located inside the _src_ folder.
  - You should see a Javascript (.js) file called config.js. Open it in a text editor, and you will see something similar to the image shown below.
 ![](RackMultipart20201122-4-136nf96_html_8239bd61b6a55662.png)

  - Right after the line that begins with //, paste the copied script contents. If done correctly, it should look similar to the image shown below.
 ![](RackMultipart20201122-4-136nf96_html_4f3e32ae4e82c0f6.png)
  - Once this is complete, go back to the firebase console website where you copied the script from and click &quot;Continue to console&quot;.
  - On the left hand side of the web page, you should see these two options:
 ![](RackMultipart20201122-4-136nf96_html_d5640ba88ff9c2e5.png)
  - Click on Cloud Firestore and on the page that loads upon clicking, press the &quot;Create Database&quot; button.
  - A dialog box should popup. If setting up this application for product, click the &quot;Start in production mode&quot;. Click next and then click &quot;Enable&quot; on the screen following it.
  - Once on the Cloud Firestore page, click the &quot;Rules&quot; tab as shown below.
 ![](RackMultipart20201122-4-136nf96_html_9355b5a4d618a4e4.png)

  - ![](RackMultipart20201122-4-136nf96_html_6564726b40e42d89.gif)rules\_version = &#39;2&#39;;service cloud.firestore {match /databases/{database}/documents {// match /parents/{parentId} {// // allow read, write: if isLoggedIn() &amp;&amp; request.auth.uid == parentId;// allow read, write: if isLoggedIn();// }match /parents/{parentId} {allow read, write: if isLoggedIn() &amp;&amp; (isParent(parentId) || isAdmin());match /{childCollections=\*\*} {allow read, write: if isLoggedIn() &amp;&amp; (isParent(parentId) || isAdmin());}}match /admins/{adminId} {allow read, write: if isLoggedIn() &amp;&amp; request.auth.uid == adminId;}function isLoggedIn() {return request.auth.uid != null;}function isParent(parentId) {return request.auth.uid == parentId;}function isAdmin() {return request.auth.uid != null &amp;&amp; get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;} }}In the editor that pops up upon clicking rules, paste the following rules:
  - Once pasted, click &quot;Publish&quot;.
  - Navigate to the &quot;Authentication&quot; page located on the left hand side.
 ![](RackMultipart20201122-4-136nf96_html_d5640ba88ff9c2e5.png)
  - After clicking Authentication, click &quot;Get Started&quot; or &quot;Create Authentication&quot; depending on which one shows up.
  - Once in the Authentication page, navigate to the &quot;Sign-In method&quot; tab and click on &quot;Email/Password&quot; which should be the first entry in the table that pops up.
  - A ![](RackMultipart20201122-4-136nf96_html_53a20154ad903c83.png) fter clicking, click on the first slider to enable email login. If done correctly, it should look similar to the image below.


  - Click &quot;Save&quot;
  - You are done with the installation!

**RUNNING APPLICATION**

- Launch a new terminal in the directory containing &quot;package.json&quot;. This is the same directory from which &quot;yarn install&quot; was done earlier. To run the app, type in &quot;yarn start&quot; and press enter. After a minute or so, a window in a browser should open with the application.

**TROUBLESHOOTING**

- If you encounter any problems with &quot;yarn install&quot;, make sure you have yarn installed on your machine using npm.
- With any other problem, try repeating the entire process again.
