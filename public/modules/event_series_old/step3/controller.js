/** 
Anguler Controller to manage look and feel 
Created : 2016-05-26
Created By: Deepak khokkar  
Module : Step 3 Event step  
*/
angular.module('alisthub').controller('stepevent3Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad) {
     var $serviceTest = $injector.get("Lookservice");
     $scope.error_message = true;
    $scope.click_menu = function(menu, data, valid) {

    if (menu.id === 5) {
     $location.path("/create_event_step1/"+$localStorage.eventId);
    }

    ///TO move to price and level
    if (menu.id === 6) {

            
            $location.path("/create_event_step2/"+$localStorage.eventId);
     
    }

    //look and feel div
    if (menu.id === 7) {
        $location.path("/create_event_step3/"+$localStorage.eventId);
     }
    //Event Setting div
    if (menu.id === 8) {
      $location.path("/create_event_step4/"+$localStorage.eventId);
    }
    $scope.selected2 = menu;
  }

     //To get steps
  $scope.steps = [

    {
      "title": "Events Details",
      "icon": 'fa fa-calendar',
      'id': 5,
      "formname": 'myForm'
    }, {
      "title": "Price & Links",
      "icon": 'fa fa-tags',
      'id': 6,
      "formname": 'myForm'
    }, {
      "title": "Look & Feel",
      "icon": 'fa fa-eye',
      'id': 7,
      "formname": 'myForm1'
    }, {
      "title": "Setting",
      "icon": 'fa fa-cog',
      'id': 8,
      "formname": 'event-form'
    }

  ];
   $scope.selected2 = $scope.steps[2];
   $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };
    $scope.campaign_div=false;
    $scope.module_div=$scope.recipient_div=$scope.preview_div=$scope.image_div=$scope.block_div=true;
   if ($localStorage.userId!=undefined) {
      //To get venues of a user 
        $serviceTest.getlookAndFeel({},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.templates=response.result;
            }

            }else{
             $scope.templates=[];   
            }
            
        });
    }
   
    $scope.items = ['item1'];

    $scope.animationsEnabled = true;  
    $scope.look_and_feel_step = [
    { "name": "Template",'id':1},
    {"name": "Design",'id':2},
    {"name": "Preview",'id':4}
  ]
    
    $scope.look_and_feel_choose_type = [
    { "name": "Color",'id':5},
    {"name": "Images",'id':6},
    {"name": "Blocks",'id':7}
   
  ]
    
    $scope.selected=$scope.look_and_feel_step[0];
    $scope.selected1=$scope.look_and_feel_choose_type[0];
     $scope.select1= function(item1) {
    if (item1.id==5) {
      
      $scope.color_div=false;
      $scope.image_div=$scope.block_div=true;  
    } else if (item1.id==6) {
      $scope.color_div=$scope.block_div=true;
      $scope.image_div=false;       
    }else if (item1.id==7) {
      $scope.color_div=$scope.image_div=true;
      $scope.block_div=false;       
    }
    $scope.selected1 = item1; 
  };
   $scope.isActive1 = function(item1) {
    return $scope.selected1 === item1;
  };
     $scope.select= function(item) {
    if (item.id==1) {
      
      $scope.module_div=$scope.recipient_div=$scope.preview_div=true;
      $scope.campaign_div=false;  
    } else if (item.id==2) {
     $scope.module_div=false;
      $scope.campaign_div=$scope.recipient_div=$scope.preview_div=true;       
    }
    else if (item.id==3) {
     $scope.recipient_div=false;
      $scope.campaign_div=$scope.module_div=$scope.preview_div=true;       
    }
    else if (item.id==4) {
     $scope.preview_div=false;
      $scope.campaign_div=$scope.recipient_div=$scope.module_div=true;       
    }
    $scope.selected = item; 
  };


  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
   
    $scope.preview_btn=function($index,size)
    {
       $rootScope.templateId=$index;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'previewtemplate.html',
            controller: 'PreviewTemplateCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
    }
    
  $scope.option_ckeditor1 = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
   
  $scope.content1="<h3>Heading</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur </p>";
  $scope.content2='<h3>Heading</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>';
  $scope.content3='<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>';
  $scope.content4='<p>Footer content will be shown here.</p>';
  // Called when the editor is completely ready.
  $scope.onReady = function () {
   
  };
    
    $scope.select_btn=function(index)
    {
         $serviceTest.getTemplate({'templateId':index},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
               $scope.look_and_feel_description=response.result[0].description;
               
               $scope.desc=$sce.trustAsHtml($scope.look_and_feel_description);
               
               $scope.module_div=false;
               $scope.campaign_div=true;
               $scope.selected=$scope.look_and_feel_step[1];
            }

            }else{
               $scope.look_and_feel_description=[];   
            }
            
        });
       
    }
    
    $scope.$watch('backgroundColor', function(newValue, oldValue) {
             $scope.background_outer=newValue;
        });
    $scope.$watch('InnerbackgroundColor', function(newValue, oldValue) {
            
             $scope.background_inner=newValue;
        }); 
    $scope.$watch('TextColor', function(newValue, oldValue) {
             
             if (oldValue==undefined) {
              $scope.text_color='#000'; 
             }else{
             $scope.text_color=newValue;
             }
        });
    $scope.$watch('OuterborderColor', function(newValue, oldValue) {
            
             $scope.border_outer=newValue;
        });
    $scope.$watch('InnerborderColor', function(newValue, oldValue) {
            $scope.border_color="solid 1px "+newValue;
        });
    
     /* Encode Image to base64 URL */
        $scope.encodeImageFileAsURL = function() {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                var myEl = angular.element( document.querySelector( '#imgTest' ) );
                                myEl.prepend('<li>'+newImage.outerHTML+'</li>');
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
        $scope.banner_image='images/img/f-img-o.jpg';
        $scope.section2_image='images/img/s-img-o.jpg';
        $scope.section3_image='images/img/f-img-o.jpg';
         $scope.encodeImageFileAsURL1 = function() {
            var filesSelected = document.getElementById("my_file").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                $scope.banner_image=$scope.image;
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
        
        $scope.encodeImageFileAsURL2 = function() {
            var filesSelected = document.getElementById("my_file2").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                $scope.section2_image=$scope.image;
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
        $scope.encodeImageFileAsURL3 = function() {
            var filesSelected = document.getElementById("my_file3").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                $scope.section3_image=$scope.image;
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }

    
    
});
angular.module('alisthub').controller('PreviewTemplateCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    var $serviceTest = $injector.get("Lookservice");
    var templateId=$rootScope.templateId;
    $serviceTest.getpreviewImage({'templateId':templateId},function(response){
       if (response.code==200) {
        $scope.preview_image=response.result[0].preview_image;
       }
    });
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});



angular.module('alisthub').filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){	
    return $sce.trustAsHtml(htmlCode);
  }
}]);