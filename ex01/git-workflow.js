
'origin' = github.com/repo
---------------
	LOCAL
---------------
	pwd // ensure you are actually on local
	git branch
	*master
	git checkout -b develop // create a Local 'develop'
	git checkout master // jump back onto the Local 'master'
	git push origin develop // upload the Local 'develop' to 'origin'
	git checkout develop // jump back onto the Local 'develop'

=================================
	WHEN NEW TICKET IS ASSIGNED
=================================

	-------------------
		LOCAL
	-------------------
		// git branch
		// 	*master
		git checkout develop
		git checkout -b feature develop // create a Local 'feature' off of the Local 'develop'

		//.....................................
		// Start working on the ticket
		> editor > work > WB > OK?  // do the work
		// work
		// work
		// work
		//.....................................

		// Ready for Staging?
		> WB: local > is everything correct on Local?
		git diff
		git add . // to stage all the newly added files, too!
		git commit -a -m "xxx"
		// git diff
		git log --oneline -20
		git push origin feature // upload the Local 'feature' to 'origin', thereby creating the 'origin''feature'




	!!! > mRemoteNG > sandbox > project (!!!) 
	*** make sure you are in the correct project directory ***
	=====================
		* STAGING 
	=====================
		pwd // check you are actually in Staging of the CORRECT project
		git branch 
		//   develop
		// * master
			
		git fetch
			*[new branch] feature -> origin/feature // note the name of the feature branch
		git checkout feature // jump onto the Staging 'feature'
		//git pull // if a pickup is committed
		// git branch
		> WB > Staging > is everything correct Staging?
		/* 
		send the Staging URL for approval
		- open the Jira ticket
		- leave a comment with "Done. Staging: {staging url}."
		*/


Approved for Prod?

If approved to go to Prod:

**********************************************
******* # MERGE THE FEATURE INTO DEVELOP *******
**********************************************

	=====================
		# LOCAL
	=====================
		pwd // are you on LOCAL? Check the name of the PROJECT, is it correct?
		// git diff // ensure there is nothing not committed yet
		git log --oneline -20
		// git branch
		git checkout develop // jump onto the Local 'develop'
		// git branch
		git merge --no-ff feature // pull the changes down to the Local 'develop' from the Local 'feature'
			> vim > Shift + : > wq
		// git branch
		> WB: local > is everything correct on Local?

		git branch -d feature // delete the Local 'feature' as not needed anymore
		// git branch
		// * develop
		//   master
		git push origin develop // upload changes made in the Local 'develop' to 'origin' 'develop'




	> mRemoteNG > sandbox > project
	=====================
		# STAGING 
	=====================
		pwd // check you are actually in Staging of the CORRECT project!!!
		// git branch
		//   develop
		// 	*feature
		//   master
		git checkout develop // jump from the Staging 'feature' onto the Staging 'develop'
		// git branch
		git pull // download the changes from the 'origin' 'develop' to this Staging 'develop'
			// sometimes this triggers a merge. Why?
		git log --oneline -20 // check for your commits
		> WB > Staging > is everything correct on Staging?

		git branch 
		// * develop
		//   feature
		//   master
		git branch -d feature // delete the Staging 'feature' from Staging as not needed any longer
		// git branch // to make sure the Staging {feature} is deleted
		// * develop
		//   master

		/* 	
			At this point, you end up with your Staging 'develop' 
			updated with all the changes from the 'origin' 'develop'
		*/




***************************************************
******* # A. WITH CREATING A RELEASE **************
***************************************************


	=====================
		# LOCAL
	=====================
		pwd // ensure you are actually on local of the correct project
		// git branch
		// 	*develop
		git checkout -b release-xxx develop // create a Local 'release' off the local 'develop'. {xxx} is today's date, e.g. '181123' for 2018 November 23rd.
		// git branch

		//..................................
		// DO SOME LAST-MINUTE WORK IF ANY.
		// get last minute work done?
		//..................................

		> WB > Local > is everything correct on Local?

		git push origin release-xxx // upload the local 'release' to 'origin', thereby creating an 'origin''release'





	> mRemoteNG > sandbox > project
	=====================
		# STAGING 
	=====================
		pwd // ensure you are actually on Staging, not on Local or Prod AND that it's the correct project name
		git fetch // get a Staging 'release' as a copy of the 'origin''release'
		git checkout release-xxx // jump onto the Staging 'release'
		// git branch
		> WB > Staging > is everything correct on Staging?







	=====================
		# LOCAL
	=====================
		pwd // is the repo Local? Is the project name correct?
		git branch 
		// 	* release-xxx
		git checkout master // jump from Local 'release' onto Local 'master'
		git merge --no-ff release-xxx // pull into local 'master' the changes from the local 'release'
			> vim > Shift + : > wq
			> WB > local > is everything correct on Local?
		git log --oneline -20
		git push origin master // upload changes in the local 'master' to 'origin' 'master'
		// git branch
		//   develop
		// 	*master
		//   release-xxx
		git branch -d release-xxx // delete the local 'release' as not needed anymore
		// git branch // make sure the release- branch is gone
		//	  develop
		//	* master






	> mRemoteNG > sandbox > project
	=====================
		# STAGING 
	=====================
		pwd // ensure you are actually on Staging!!! and on the correct branch of the correct PROJECT
		// git branch
		// 	*release-xxx

		git checkout master // jump on Staging 'master'
		/*
			MESSAGE:
			Switched to branch 'master'
			Your branch and 'origin/master' have diverged,
			and have X and X different commits each, respectively.
			(use "git pull" to merge the remote branch into yours)
		*/
		git branch		
		// 	develop
		//	*master
		//  release-xxx	
		git merge --no-ff release-xxx // pull the changes from the Staging 'release' to the Staging 'master'
			> vim > 
			> i > Merge ... into master
			> Esc
			> Shift + : > wq
		// git branch
		//  * master
		git log --oneline -20
			> WB > Staging > is everything correct on Staging?
		
		git branch	
		git branch -d release-xxx // delete the staging 'release' as not needed anymore
		git branch
			//   develop
			//  *master
		



		/*????
		Were any changes made in the release branch? If yes...
		git checkout develop
		git branch
		git merge --no-ff release-xxx
		> WB > Staging > is everything correct on Staging?
		*/

		// git checkout master
		// git log --oneline -20
		// > WB > Staging > is everything correct on Staging?
		// git branch -d release-xxx
		// git branch

						// ???
						// git pull origin master // download the latest changes from 'origin' master to the Staging 'master'
						// > WB > Staging > is everything correct on Staging?
						// git branch
						// 	*master



						// git pu
						// git branch -d release-xxx
						// git branch

***************************************************
******* # B. WIHTOUT CREATING A RELEASE ***********
***************************************************

	=====================
		# LOCAL
	=====================
		pwd // ensure you are actually on local of the correct project
		// git branch
			// *develop
			//  master

		git checkout master // jump from Local 'release' onto Local 'master'
		// git branch
			//   develop
			// * master
		git merge --no-ff develop // pull into local 'master' the changes from the local 'develop'
			> vim > Shift + : > wq
			> WB > local > is everything correct on Local?
		git log --oneline -20
		git push origin master // upload changes in the local 'master' to 'origin' 'master'

	=====================
		# STAGING 
	=====================
		pwd // ensure you are actually on Staging!!! and on the correct branch of the correct PROJECT
		// git branch
		// 	*develop

		git checkout master // jump on Staging 'master'
		/*
			MESSAGE:
			Switched to branch 'master'
			Your branch and 'origin/master' have diverged,
			and have X and X different commits each, respectively.
			(use "git pull" to merge the remote branch into yours)
		*/
		git branch		
		// 	develop
		//	*master
		git merge --no-ff develop // pull the changes from the Staging 'develop' to the Staging 'master'
			> vim > 
			> i > Merge ... into master
			> Esc
			> Shift + : > wq
		// git branch
		//    develop
		//  * master
		git log --oneline -20
			> WB > Staging > is everything correct on Staging?
		
		git branch
		//    develop
		//  * master


******************************
*** HANDLE WITH CARE!!! ******
******************************

> mRemoteNG > cd to PRODUCTION > project

******************************************
******* PRODUCTION ***********************
******************************************

	> WB > Prod > check the PRODUCTION before updating it.
	
	pwd // ensure you are actually on Prod, the correct branch, the correct project
	git branch // must be the only branch always
	// 	*master
	git pull // download the latest changes from the 'origin' master to the prod 'master'
		// sometimes triggers Merge. Why?
	git log --oneline -20
	// git branch
	> WB > Prod > is everything correct on PRODUCTION?

	!!!---> switch back to the sandbox
	pwd

	// You're done!
	// - Go to the Jira ticket
	// - Add comment: "Done. {Prod URL}." 
	// - Mark the Jira ticket "Done"
	// - Notify the PM
