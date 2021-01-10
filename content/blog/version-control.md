---
title: The Importance of Version Control
category: Coding
excerpt: Why every developer needs to learn version control for their projects or teams.
created: 2021-01-09
keywords: 'Version Control,Source Control,Git,Subversion,SVN,Mercurial,Software Engineering,Software,Programming,Coding'
image: ./images/version-control/heading.png
image_caption: Photo by Josh Arrants
author: author1
---

Have you ever made a mistake in a project or codebase you're working on and found yourself wanting to _turn back the clock_ and compare previous **versions** of your code to help fix that error? This sort of convention becomes extremely difficult without version control. Version control protects source code from casual human error and increases successful deployments of your code. It also helps reduce development time and increases developer productivity by allowing other developers to collaborate on a project together. Let's learn why you should utilize a version control system on all of your projects.

- [What is version control?](#what-is-version-control)
- [Version control software](#version-control-software)
- [What is Git?](#what-is-git)
- [Where to learn Git](#where-to-learn-git)

## What is version control?

Version control, also known as source (or revision) control, is the practice of tracking and managing changes in source code. It's responsible for supervising edits of programs or applications, documents, websites, or other collections of information. As your project becomes larger, version control helps software teams work much faster and smarter. Many companies employ their own department, called [DevOps](https://www.atlassian.com/devops/what-is-devops), to handle more advanced version control practices, such as [CI/CD](https://stackify.com/what-is-cicd-whats-important-and-how-to-get-it-right/).

Version control is not just useful for one individual working on their own project, but also for software developers working in teams. Developers working in teams are constantly writing new code or changing existing code in a project. Using version control, one developer may be working on a new feature while another developer is fixing an unrelated defect, therefore reducing errors between the two. This helps teams avoid the problem of conflicting concurrent work by keeping track of each individual change.

## Version control software

Version control in your source code is mainly practiced using version control software (VCS). In theory, a good version control software supports a developer's preferred workflow without infringing on their style of working.

IBM's OS/360 [IEBUPDTE](https://en.wikipedia.org/wiki/Support_programs_for_OS/360_and_successors#IEBUPDTE) software update tool dates back to 1962 and is considered to be the precursor to today's modern VCS tools. More modern examples of VCS tools include Subversion (SVN), CVS, Mercurial, and Git.

By far, one of the most popular VCS tools in use today is [Git](https://git-scm.com/). This is also what I personally use for all of my projects. Git is free, open-source, and integrates with many platforms/websites in which you can view all of your version control on a user interface with GitHub, GitLab, and Bitbucket, for example.

## What is Git?

The most widely used modern version control software is Git. Git is a distributed version control system, active open source project created by Linus Torvalds in 2005, the creator of the Linux operating system kernel. Git is a DVCS, meaning that rather than having only one place for a full version history of the software, every developer's copy of a project is a separate repository that contains the full history of all changes.

As Git becomes more popular, Git integrates well with the most common text editors and IDE's. For example, VSCode comes with version control integration right out of the box, assuming your project source code has a Git repository initialized onto it. This makes collaboration and versioning an absolute breeze for developers and teams.

## Where to learn Git

In my opinion, it's very easy to learn the basics of Git, such as initializing an empty Git repository, committing your code, pushing, and cloning someone elses code. To get started on learning Git, I'd recommending reading Git's [documentation](https://git-scm.com/doc). After that, Traversy Media has a great crash course tutorial video on this topic, including how to use GitHub [here](https://www.youtube.com/watch?v=SWYqp7iY_Tc). Atlassian, the creators of Bitbucket, also have a great tutorial portal on learning Git [here](https://www.atlassian.com/git).