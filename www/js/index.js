/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        console.log("DEBUG1");
    	this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(function(position)
			{
				var html = "<h4>Geographic location</h4><ul><li>lat:" + position.coords.latitude +
				"</li><li>Lng:" + position.coords.longitude + "</li></ul>";
				console.log(html);
				var p = document.getElementById("Skookum");
				
				var request = new XMLHttpRequest();
				var url = "http://open.mapquestapi.com/geocoding/v1/reverse?" + 
				"key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
				position.coords.latitude + "," + position.coords.longitude;
				request.open("GET",url,true);
				request.onreadystatechange = function()
				{
					if(request.readyState === 4)
					{
						if(request.status === 200 || request.status === 0)
						{
							console.log("RESPONSE[" + request.responseText + "]");
							var obj;
							try
							{
								obj = JSON.parse(request.responseText);
								var resultsArray = obj.results;
								html += "<h4>Mapquest</h4>" +
								"<ul>";
								for(var i=0; i < resultsArray.length; i++)
								{
									html +=
									"<li>result[" + i + "]</li>";
									var result = resultsArray[i];
									for(var j=0; j < result.locations.length; j++)
									{
										html += 
										"<li>location[" + j + "]" +
											"<ul>";
												var location = result.locations[j];
												html += 
												"<li>street: " + location.street + "</li>" +
												"<li>adminArea5: " + location.adminArea5 + "</li>" +
												"<li>adminArea3: " + location.adminArea3 + "</li>" +
											"</ul>" + 
										"</li>";
									}
								}
								html +=
								"</ul>";
								console.log(html);
								var wait = "Wait Here";
								p.innerHTML = html;
							}catch(e){
								console.log("Error[" + e + "]");
							}
						}
					}
				}
				request.send();
				p.innerHTML = html;
			},
			function(error)
			{
				console.log("Error:" + error.code + " " + error.message);
			});
		}
		else
		{
			 console.log('No Geolocation Service');
		}
    }
};
