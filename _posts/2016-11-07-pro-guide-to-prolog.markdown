---
layout: post
title:  "?- intro(prolog)."
date:   2016-11-07
categories: languages prolog
---
 
<p>
Throughout my career I had looked all kinds of programming languages... all the way from Befunge to FORTRAN. However, I had never stopped to marvel at the often forgotten world of logic programming until recently when I was introduced to Prolog in one of my graduate courses. My procedural programming perspective was challenged and I couldn't help but dive deeper into Prolog.
</p>

<p>
Prolog was the result of two professors from the University of Aix-Marseille, Alain Colmerauer and Phillippe Roussel, along with vital assistance provided from Robert Kowalski from the University of Edinburgh. Together they were interested in creating a language that lended itself to their various topics of research, namely automated theorem proving and natural language processing. So, Colmerauer, Roussel, and Kowalski collaborated and released Prolog in 1972 to the public. Since then, Prolog has split off into a wide array of other implementations and dialects along with influencing other notable languages such as Clojure and Erlang. Unsurprisingly, some of the implementations are still being actively supported to this day!
</p>

<p>
So, what exactly is Prolog and what caused it to leave such a mark on the history of programming? To begin dissecting this question, we must understand a few different concepts of programming languages. The first and most major difference of Prolog is the paradigm of the language. Most commonly-used languages are imperative meaning that the state of the program is changed via statements or commands. However, Prolog is a declarative language. So unlike imperative languages which manipulate the program state and flow using assignments and control-flow operators, declarative languages simply make declarations. Robert W. Sebesta in his book, <i>Concepts of Programming Languages 11th Edition</i>, states the difference is in imperative programming the programmer knows what to do and tells the computer how to do it. Whereas in declarative programming programmers do not know how to get the result but instead provide the form of the result to the computer and then assume the computer can make a deterministic statement given the declarations (p. 721). The way that these statements are achieved is by evaluating a set of facts and rules through the application of first-order logic. First-order logic is -- to put it simply -- taking logical propositions and creating variables (facts) and expressions (rules) that allow us to think of the logical proposition in a mathematical way. Lucky for us, this type of math called boolean algebra is a fundamental part of computing and therefore can be exploited in logic programming.
</p>

<div>
	<div style="display:inline-block;width:64%;">
		<p>
		Let's look at a classic example of first-order logic. Suppose we have the statement: <i>All men are mortal. Socrates is a man, therefore he is mortal</i>. We can rewrite <i>Socrates is a man</i> using the following variable of <i>man(socrates)</i>. Furthermore, we can rewrite the conditional statement <i>all men are mortal</i> as <i>man(x) &rarr; mortal(x)</i>. Finally, we need to evaluate the rule with our given fact and see what the value is. To do this, we would state <i>mortal(socrates)?</i> and the result would be true because of the rule <i>man(x) &rarr; mortal(x)</i> and the fact that <i>man(socrates)</i>.  This concept is the backbone for Prolog and is what makes it so powerful. That and being able to evaluate partially-incomplete sentences (more on this later).
		</p>
	</div>
	<div style="display:inline-block;width:34%;">
		Boris: A: Socrates is a man. B: All men are mortal. C: All men are Socrates.<br/>
		Woody Allen in Love and Death.
	</div>
</div>

<p>
Unsurprisingly, Prolog is made up of these very basic data structures that are present in first-order logic: terms, facts, rules, and goals. Terms are the basic blocks of Prolog being either an integer or an atom -- a fancy term which is simply a symbolic value (always lowercase). Then we have facts which are propositions provided by the programmer to construct a 'database' for the program to use. These facts have no intrinsic meaning and are used by rules and goals to ascertain truth. Rules are the meat of Prolog and are also added to the working 'database' for a Prolog program. These rules allow conclusions to be drawn based on different combination of facts that have been defined. Finally, we have goals which are basically questions we ask the computer after the database has been constructed. Another way of thinking is that goals are like queries to the database and we want to retrieve some value based on what we have provided. If we look at our previous example with Socrates, we can now represent all 4 major components of Prolog and gain a better understanding for how they all work together.
</p>

<p class="code">
man(socrates).		// fact(atom)
mortal(X) :- man(X).	// rule(Var) is true IF fact(Var) is true

--

?- mortal(socrates).	// goal(atom)
</p>

<p>
And there we have it! Our first Prolog program which determins that Socrates is indeed mortal, but this isn't very groundbreaking news and the Prolog intepreter isn't even breaking a sweat. What else can we do? To stay true to the first intentions of Prolog, we can build a simple natural langauge processor which determines if a sentence is syntactically correct. Let's assume English is a bit simpler and follows this diagram.
<br/>
<img style="display:block;margin:auto;border:1px solid black;" src="/assets/nlp_tree.png">
<br/>
Using Prolog we can create a set of rules to mimic this parse tree.
</p>

<p class="code">
noun(i).
noun(you).
noun(car).
noun(banana).
noun([X|_]) :- noun(X). % converts a list of one atom to a single atom

verb(ate).
verb(drove).

determiner(the).
determiner(a).

sentence([X|Y]) :- noun(X), verbphrase(Y).
verbphrase([X|Y]) :- verb(X), nounphrase(Y).
nounphrase([X|Y]) :- determiner(X), noun(Y).
</p>

<p>
In the above code we have a very simplified form of English with a vocabulary containing a whopping 8 words! Now if we query the interpreter with: <i>?- sentence([i, ate, the, banana]).</i> the interpreter will return true meaning this is a valid sentence! However, <i>?- sentence([the, banana, drove, a, car]).</i> will return false based on our parse tree. Neat! You might be wondering what some of the new syntax in the above code is, namely <i>[X|Y]</i> and the presence of a comma in the rules. <i>[X|Y]</i> is Prolog's way of dealing with lists, a sequence of terms. <i>[X|Y]</i> splits the list into the single head term (X), and the remainder of the list (Y). So basically we are using a recursive descent parser where we take the first term of the sentence and check to see if that's a valid noun, then we see if the next terms create a valid verbphase which until we reach the final noun. Then once we have determined the final term is a noun, we traverse back up the tree signaling all of the rules are indeed true. Then, and only then, do we know the sentence is a valid sentence.
</p>

<p>
Remember when I said Prolog can evaluate goals with partially-incomplete parameters? Let's see what I meant by that. If we ask the interpreter <i>?- sentence([i, ate, D, banana]).</i> we are given an answer of <i>X = the; X = a.</i> meaning both 'the' and 'a' are valid determiners in the given context. This behavior allows for some very powerful rules and goals to be crafted that remove a lot of the complications seen in imperative languages.
</p>

<p>
There is so much more to talk about when dealing with Prolog and logic programming but hopefully this has been a good taste and will make you want to learn more! For more information look at <a href="http://www.cpp.edu/~jrfisher/www/prolog_tutorial/contents.html">this tutorial</a> by J.R. Fisher. It has a myriad of different sample programs and other resources that I found very helpful. Also, Sebesta's <i>Concepts of Programming Languages</i> has a very in-depth section on the back-tracking and resolution that occurs in Prolog that will help explain the mysterious innerworkings of Prolog. Enjoy!
</p>

<p class="references">
	<h5>References</h5>
	<ol>
		<li>
			Sebesta, R. W., Mukherjee, S., & Bhattacharjee, A. K. (2016). <i>Concepts of programming languages</i> (11th ed.). Pearson.
		</li>
		<li>
			Kaiser, S. H. (2005). <i>Software paradigms</i>. Hoboken, NJ: Wiley-Interscience.
		</li>
		<li>
			Fisher, J. R. (2010, February 03). Prolog Tutorial. Retrieved November 08, 2016, from http://www.cpp.edu/~jrfisher/www/prolog_tutorial/contents.html
		</li>
	</ol>
</p>