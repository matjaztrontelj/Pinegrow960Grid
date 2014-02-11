$(function() {

    //Wait for Pinegrow to wake-up
    $('body').one('pinegrow-ready', function(e, pinegrow) {

        //Create new Pinegrow framework object
        var f = new PgFramework('960grid', '960 Grid');

        //This will prevent activating multiple versions of 960 grid framework, provided that other versions set the same type
        f.type = "960grid";
        f.allow_single_type = true;

        //Don't show these files in CSS tab
        f.ignore_css_files = [/(^|\/)960.*\.(css|less)/i, /(^|\/)text.*\.(css|less)/i, /(^|\/)reset.*\.(css|less)/i];

        //Auto detect 960 grid. It can also be manually added / removed from a page with Framework Manager
        f.detect = function(pgPage) {
            return pgPage.hasStylesheet(/(^|\/)960.*\.(css|less)/i);
        }

        //Tell Pinegrow about the framework
        pinegrow.addFramework(f);
        console.log('f added');

        //Add properties common to all components of this framework
        //Properties are arranged in sections
        //This is just an example. With 960 grid we don't need it
        /*
        f.common_sections = {

            //A section
            common_960 : { //Can be anything, good to prefix/suffix
                name : "960 Grid options", //Section name
                fields : { //Properties
                    clear_960 : { //Can be anything, good to prefix/suffix
                        type : 'checkbox', //This is a checkbox
                        name : 'Clear', //Name
                        action : "apply_class", //Apply value as class to element
                        value: 'clear' //Value if checked
                    }
                }
            }
        }
        */


        //Lets add components
        //Pinegrow will try to match DOM elements to these components
        //Use type identifiers that will not clash with other framework. 960- prefix is an ok solution.

        //Container
        //==================
        var container = new PgComponentType('960-container', 'Container');

        //How can we identify DOM elements that are containers?
        container.selector = ".container_12,.container_16";

        //Html code for container, that will be inserted into the page
        container.code = '<div class="container_12"></div>';

        //Set empty_placeholder to true so that empty container gets min-height set. Otherwise empty container would be invisible. This lets us see it and use it as drop target. Placeholder style gets removed as soon as we add something to this element.
        container.empty_placeholder = true;

        //Highlight element in the tree to show it is important and has special features
        container.tags = 'major';

        //Here comes the interesting part: defining property sections and fields, shown in PROP tab when the element is selected
        container.sections = {
            layout_960 : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Layout',
                fields : { //Fields
                    cols_960 : { //Can be anything. Must be unique within the component.
                        type : 'select', //Field type
                        name : 'Number of columns',
                        action : "apply_class", //Prop value should be applied as a class
                        show_empty: false, //For select
                        options: [ //Array of option objects
                            {key: 'container_12', name: '12'},
                            {key: 'container_16', name: '16'},
                            {key: 'container_24', name: '24'}
                        ]
                    }
                }
            }
        }
        //Add it to our framework
        f.addComponentType(container);
        //===============
        //End of container


        //Columns

        //First define options arrays
        var grid = [];
        var push = [];
        var pull = [];
        var prefix = [];
        var suffix = [];

        for(var i = 1; i <= 24; i++) {
            grid.push({key: 'grid_' + i, name: i});
            push.push({key: 'push_' + i, name: i});
            pull.push({key: 'pull_' + i, name: i});
            prefix.push({key: 'prefix_' + i, name: i});
            suffix.push({key: 'suffix_' + i, name: i});
        }

        var column = new PgComponentType('960-column', 'Column');

        //How can we identify DOM elements that are columns? Selector can also be a func.
        column.selector = function($el) {
            //Element is column if its parent is a container
            return $el.parent().is('.container_12,.container_16,.container_24');
        }
        column.code = '<div class="grid_4"></div>';
        column.empty_placeholder = true;
        column.tags = 'major';
        column.sections = {
            layout_960 : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Layout',
                fields : { //Fields
                    rows_960 : {
                        type : 'select',
                        name : 'Span',
                        action : "apply_class",
                        show_empty: true, //Allow empty
                        options: grid
                    },
                    push_960 : {
                        type : 'select',
                        name : 'Push',
                        action : "apply_class",
                        show_empty: true,
                        options: push
                    },
                    pull_960 : {
                        type : 'select',
                        name : 'Pull',
                        action : "apply_class",
                        show_empty: true,
                        options: pull
                    },
                    prefix_960 : {
                        type : 'select',
                        name : 'Prefix',
                        action : "apply_class",
                        show_empty: true,
                        options: prefix
                    },
                    suffix_960 : {
                        type : 'select',
                        name : 'Suffix',
                        action : "apply_class",
                        show_empty: false,
                        options: suffix
                    },
                    alpha_960 : {
                        type : 'checkbox', //This is a checkbox
                        name : 'Alpha',
                        action : "apply_class",
                        value: 'alpha' //Value if checked
                    },
                    omega_960 : {
                        type : 'checkbox', //This is a checkbox
                        name : 'Omega',
                        action : "apply_class",
                        value: 'omega' //Value if checked
                    },
                    clear_960 : { //Can be anything, good to prefix/suffix
                        type : 'checkbox', //This is a checkbox
                        name : 'Clear', //Name
                        action : "apply_class", //Apply value as class to element
                        value: 'clear' //Value if checked
                    }
                }
            }
        }
        //Add it to our framework
        f.addComponentType(column);

        //Now, lets define sections and elements shown in LIB tab
        var section = new PgFramewrokLibSection('960grid-layout', 'Layout');
        //Pass components in array
        section.setComponentTypes([container, column]);
        f.addLibSection(section);

        //That's it!!! Simple, right? A lot of magic stuff could be done here, check Bootstrap framework for inspiration.

    });
});