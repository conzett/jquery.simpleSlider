jQuery SimpleSlider
===================

Copyright (C) 2011 Graham Conzett

Overview
--------

jQuery SimpleSlider is a light weight panel sliding in page navigation plugin
for when you just need a simple sliding menu system and not the weight and
options of something like jqTouch.

Features
--------

Pass a container object that acts as the wrapper for all the panels. Back
buttons will be automatically be generated for each subsequent page. The
links you use to switch panels must match the ID of the target panel to 
work, see example below.

Currently the plugin supports four options that can be passed to it:

* speed : 200 - The speed at which the pannels move
* backClassName : back - The class name that is used for the back button
* root : null - The starting and root page element, by default it will be the first child of the container
* callback : function() {} - A function that is executed when the plugin finishes executing

Example
--------

    <div id="main">
        <section id="lists">
            <h1>Pages</h1>
            <ul>
                <li><a href="#create">Create</a></li>
                <li><a href="#update">Update</a></li>
            </ul>
        </section>
        <section id="create">
            <h1>Create</h1>
        </section>
        <section id="update">
            <h1>Update</h1>
        </section>
    </div>

    $(document).ready(function() {
        $('#main').simpleSlider({
            'speed' : 300
        });
    });

