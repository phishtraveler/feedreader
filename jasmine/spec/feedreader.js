/* feedreader.js
 *FEWD Jevon Grimes November Cohort
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

 //Jevon Grimes FEWD Nanodegree November Cohort 2015

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a URL and the URL is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }

         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name and the name is not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) { 
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }

         });
    });

    /* This test suite makes sure "The menu" is hidden */
    describe('the menu', function() {

    
        /* The test makes sure the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);

         });

         /* This test makes sure the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    describe('menu icon click', function() {
            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            //Menu Button is displayed
            it('menu button displayed', function() {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            });
            //Menu Button clicked to hide
            it('menu button hidden', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
    });

    /* This is a test suite named "Initial Entries" */
    //7-8-2015  Reconfigured this test with an array
    describe('Initial entries', function() {
        /* This test makes sure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var $entryArray = [],
         $newEntryArray;
         beforeEach(function(done) {
            //Load feeds with the furst items in the array
            loadFeed(0, function(){
                $entryArray = $('.feed .entry');
                done();
            });
          });
          //Make sure the array has at least one item  
          it('has additional elements', function(done) {
            expect($entryArray.length > 1).toBe(true);
            done();
          });
    });

    // This is a test suite named "New Feed Selection"

    describe('New Feed Selection', function() {
        var $entryArray;
        /* This test makes sure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //Getting the second feed's first text entry
       beforeEach(function(done) {
            $entryArray = $('.feed .entry').text();
            loadFeed(2, done)
        });

        //Getting the first text entry from third feed and compare to second
        it('should have new content', function(done) {
            expect($('.feed .entry').text('.entry')).not.toBe($entryArray);
            done();
        });

        //Once the text completes load first feed again
        afterAll(function (done) {
            loadFeed(0,done);
        });
    });
}());
