
Parse.initialize("JQoRy7meJUr3GboQNHkC4HcVzVHaG4GPFnhLmC2z", "ALjfHifDxF8YNuCY3wGF8f0d2Geg1nSLE7VqD3Be");
// Define a new module. 
var app = angular.module("TellAStoryApp",[]);


// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

app.controller('StoryController',function($scope){
	$scope.layout = 'grid';
	$scope.loading=true;
    var StoryLine = Parse.Object.extend("STORY_LINE");
    var query = new Parse.Query(StoryLine);
    query.find({
      success: function(StoryLines) {
		/*for(var i=0;i<StoryLines.length;i++)
		{
			var fid = StoryLine.get("fid");
			var title = StoryLine.get("title");
			var objectId = StoryLine.id;
			var updatedAt = StoryLine.updatedAt;
			var createdAt = StoryLine.createdAt;
			console.log("Fid: " + fid);
			console.log("title: " + title);
			console.log("objectId: " + objectId);
       }*/
	   var FrameObject = Parse.Object.extend("FRAME");
	   var queryFrames = new Parse.Query(FrameObject);
	   queryFrames.ascending("sequence_id");
	   queryFrames.equalTo("sid",3);
	   $scope.sid=3;
	   queryFrames.find({
		success:function(Frames)
		{
			$scope.frames = Frames;
			$scope.slideframes=Frames;
			$scope.loading=false;
			$scope.lastsequenceid=Frames[Frames.length-1].get("sequence_id");
			$scope.$apply(); //trigger digest
			//console.log("frames : " + frames);
		},
		error: function(error){
			alert("Error: "+error.code+" " + error.message);
		}
	});
    // The object was retrieved successfully.
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
      }
    });

    $scope.addFrame=function()
    {
       
    	var fileUploadControl = $('#framepic')[0];
		if (fileUploadControl.files.length > 0) {
				var file = fileUploadControl.files[0];
				var name = "photo.jpg";

				var parseFile = new Parse.File(name, file);
		}
		parseFile.save().then(function(){
		});

    	var FrameObject = Parse.Object.extend("FRAME");
    	var frameObject = new FrameObject();
    	frameObject.set("comment",$scope.frame.comment);
    	frameObject.set("sid",$scope.sid);
    	frameObject.set("photo",parseFile);
		frameObject.set("sequence_id",$scope.lastsequenceid+1);
    	frameObject.save(null,{
    		success: function(frameObject) {
    			console.log("success");
    			var FrameObject = Parse.Object.extend("FRAME");
			    var queryFrames = new Parse.Query(FrameObject);
			    queryFrames.ascending("sequence_id");
			    queryFrames.equalTo("sid",3);
			    $scope.sid=3;
			    queryFrames.find({
					success:function(Frames)
					{
						$scope.frames = Frames;
						$scope.loading=false;
						$scope.lastsequenceid=Frames[Frames.length-1].get("sequence_id");
						$scope.$apply(); //trigger digest
						//console.log("frames : " + frames);
					},
					error: function(error){
						alert("Error: "+error.code+" " + error.message);
					}
				});
    		},
    		error: function(frameObject,error)
    		{
    			alert("Failed to create the story:"+error.description);
    		}
    	});
    }

});


