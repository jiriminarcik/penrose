# ✨ Welcome, we are so glad you are here.
Ready to make some beautiful diagrams? You are at the right place. 

# What's in this tutorial? 
This tutorial consists 3 individual sections, which each contains the following content:
- **A Worked Example**
    - We will hold your hand to write and most importantly understand each line of code. Furthermore, we will be teaching you how to navigate in the Penrose repository for all the resources you need in the future. 
- **Exercises (with solutions)**
    - These exercises act as sanity checks to confirm that you have comprehended the worked example. The exercises will be very similar to the worked example, and will be a walk in the park if you fully understood the worked examples. We also have the solutions available for you to check your work. 
  
The sections build on top of each other, using the skillset we've acquired in the previous exercises, therefore we highly recommend you to follow through one by one. 

# Installation
We have a detailed wiki page on how to get Penrose up and running on your computer [here](https://github.com/penrose/penrose/wiki/Building-and-running). Come back when you are done. 

After following the Building & Running page, you should now have forked Penrose and have created a new folder in the `penrose/examples` path. So you should have something like this.

![initialize files](https://github.com/penrose/penrose/blob/docs-edit/assets/tutorial/initializa_file.png)

With the neccessary tools set up, we can finally start making Penrose programs that will produce beautiful visualizations for you. Before talking about any code, a basic understanding of a Penrose program will benefit you so you feel less overwhelmed. Learning a new environment can be intimidating, and we want to make that process go as smooth as it can possibly be.

# How do we diagram by hand? 
Now, for a second, I want you to recall how you would normally diagram a concept using a pen or pencil. 

It will most likely involve the following steps,
* **Decide on what you are diagramming**
    * There must be something that you wanted to diagram, so you are here pondering how to diagram it. 
    * Let's say we are making a diagram of all the plants 🪴 in your house, then plants would be our **domain** of objects that we are working with. 
* **Have a (mental) list of the objects you want to include in the diagram**
    * We either write down, or mentally construct the list of plants that will be included in our diagram.
    * They are the **substances** of our diagram that we will see. 
* **Figure out the relationships between the objects**
    *  If we were only to put the list of things on paper, that would not be an interesting nor useful diagram. Normally, there are relationships we want to visualize through diagramming. 
    * For example, we could group the plants based on the number of times they need to be watered on a weekly basis. Then we would have visual clusters of elements.
* **Explore different visual styles**
    * Drawings commonly require explorations and various attempts with colors, sizes, and compositions. The same concept can be visualized in a number of different **styles**. 

# What makes a Penrose program? 
Every Penrose program consists of 3 files: A `.dsl`  file that defines the language specific to the domain, a `.sub` file that creates substances of mathematical content, and lastly, a `.sty` file that specifies the style of the visual representation. We call a group of these programs (**DOMAIN, SUBSTANCE, STYLE**) that can be used together a "triple." 

![triple](https://github.com/penrose/penrose/blob/docs-edit/assets/tutorial/triple.png)

> Rest assured, you do not need to understand how it is compiled and rendered to start creating diagrams using Penrose. 

# 📖 Example (1)
This is the first diagram we will make together. This is the equivalent of ```print("Hello World")``` program for Penrose.

![exercise 1 result](https://github.com/penrose/penrose/blob/docs-edit/assets/tutorial/2sets.png)
This is what you will end up with at the end of our exercise 1. 

### What is this? 
Some of you who have experiences with set theory may recognize that ellipses are common for representing sets, and that's exactly what we have here. We have 2 sets, set A and set B. 

### DOMAIN
It follows naturally that our mathematical **domain** is the set theory. Therefore, we can rename our `.dsl` file to `setTheory.dsl`. Now recall what does a `.dsl` file do? It defines the language we use to describe the specific mathematical domain. Now I have a question for you,

#### QUESTION: What's the most fundamental element in set theory? (hint: the name gives it away.)

The answer is a **Set**! A set is a **type** of element in set theory. Therefore in our `setTheory.dsl`, we write the following line,
`.dsl`
```typescript
type Set
```
And that is all we need for this exercise! 

> If you look closely, we have a `penrose/examples/set-theory-domain/setTheory.dsl` file that contains more extensive operations common in set theory such as `Intersection, Union, Subset`, and more. 

### STYLE
For style, we have a little more work to do. A `.sty` file is essentially a `.css` file for your `html`(which wouold be our `.sub` file). Since we are only styling our diagram for the two sets, we will rename our `.sty` file to `twosets.sty`. The syntax for declaring styles goes like this,

![style syntax](https://github.com/penrose/penrose/blob/docs-edit/assets/tutorial/style_syntax.png)

`twosets.sty`
```typescript
forall Set x {
    x.icon = Circle {
        strokeWidth : 0.0
    }
}
```

### SUBSTANCE
Since we are only visualizing 2 sets named A and B, they are our mathematical **substances** for this diagram. 

We declare a substance by first declaring it's *type* followed by it's *name*. Therefore if we want to have a set named A in our visualization, we declare it using `Set A`. Here we have capitalized `Set` because recall in our `setTheory.dsl` file, we wrote `type Set`, and if we did `type set` instead, we would declare our set with `set A` here. Again, we will rename our file to be more descriptive of the content, therefore rename the `.sub` file to `twosets.sub`. 

`twosets.sub`
```typescript
Set A
Set B 
AutoLabel All
```
The last line does all the labeling work for you, so everything would be labled properly with the name you declared. To maunally label somethin would look like this. 

*manual labeling*
```typescript
Set Rn
Label Rn $\mathbb{R}^n$
```
So we highly encourage you to add that line in just so no labels go missing. :) 

### COMPILE
Now it's time to see all of our hardwork! (drumroll please 🥁) To compile your Penrose programs (more detailed description [here](https://github.com/penrose/penrose/wiki/Getting-started)), you need 
* two terminals opened both at the penrose root directory
* run `yarn start` in one to get the browser window to pop out
* run `roger watch twosets.sub twosets.sty setTheory.dsl` to send the files over to the server
* Refresh! 