# Deployment of NodeJS Projects to a Digital Ocean Droplet with CodeShip
#### By Emily Kaneff

In the [setup](setup.md) tutorial, I had you run ansible scripts that created the necessary environment on your server in addition to prepping CodeShip to deploy the project files after changes have been made on the Github repository. 

In this walk through, I will be going through the process of pushing and doing pull requests on your repository to trigger the CodeShip scripts that will deploy your files. 

##Table of Contents
* [Creating a Pull Request](#one)
* [Handling the Pull Request](#two)
* [Watch CodeShip](#three)

<a name="one"></a>
## Step One: Creating a Pull Request

Utilizing a centralized workflow means that all merges will be handled on a central point in the pipeline, such as Github. This means that instead of pushing directly to the master or release branches, the developers will be pushing their feature branches and then creating pull requests that will then be merged into the respective branches by an administrator for the repository.

Using feature branch workflow, you should have in the local version of the repository at least a master, release and development branch. It is from the development branch that you would make the individual feature branches. When your development branch is ready to be merged into release, simply run the command: 

```shell
git push origin development
```

> Make sure that you have a `.gitignore` file that includes the `node_modules` folder. This does not need to go on to the repository.

This will create a new branch called `development` on Github and push your code into it.

<a name="two"></a>
## Step Two: Handling the Pull Request

Now you need to go to Github and you should see a little yellow bar with the title of your new branch in it. Select the 'Compare and pull request' button on the right. 

From this interface, can specify which branch you would like to act as your base and which new branch you would like to merge in, or 'compare' as they word it. 

Make sure that the title and comment sections are filled out with any relevant information the admin may need when looking at your pull request. When you are satisfied with your request, select the 'Create pull request' button. 

In this case, we are the administrators of this repository, so we are able to merge in the pull request immediately. If there are no conflicts to resolve, select the 'Merge pull request' button and confirm the merge. You can then delete the development branch as it will indicate that it is safe to do so. 

<a name="three"></a>
## Step Three: Watch CodeShip

Because of the `rsync` command we set up on CodeShip, merging into the correct branches is the only thing we have to do in order to deploy our files. However, if you navigate to the dashboard of your project, you will be ale to watch the progress of the deployment scripts as they fire.

If anything goes wrong, CodeShip will notify you of what happened and when in the pipeline and abort the process. You then have the option to rerun the build after attempting to resolve the issue.

> Don't forget that in order for CodeShip to work properly, you must append it's public ssh key into the `authorized_keys` file in your server. It will throw a `permission denied` error otherwise. 

What CodeShip does is it will clone down a copy of the repository into a `clone` folder, and then from there it will copy that code base to the specified location in the deployment script, that being `rsync` in our case. 

If CodeShip doesn't error out, then the file transfer happened successfully! You can now open your project in the browser at the IP of the server or the specified domain name laid out in the server configuration files in both the staging and production roles.