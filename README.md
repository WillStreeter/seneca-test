# seneca-test
## playing with seneca


### baseNclient in action

 1)   1st node instantiated to provide seneca.add functionality of our senceca user service
      -- npm run startBase

 2)  curl call for user
            $ curl -d '{"role":"users","cmd":"get","id":2}' http://127.0.0.1:10101/act

    responds with:
            {"user":{"id":2,"first_name":"Pamela","last_name":"Stone","email":"pstone1@1688.com","gender":"Female","ip_address":"255.7.177.226"}}

3)   2nd node node instantiated serving as a clinet to call a user with the id of 7
     -- npm run startClient

     outputs:
       { user:
           { id: 7,
             first_name: 'Susan',
             last_name: 'Lynch',
             email: 'slynch6@latimes.com',
             gender: 'Female',
             ip_address: '209.223.122.113' }
        }
        {"kind":"notice","notice":"hello seneca fs6nfflu93nh/1489771962808/22567/3.3.0/-","level":"info","when":1489771962957}


 #### Shut down these service so we can try out seneca mesh


### now using seneca-mesh

    [notes from  article]=(http://www.richardrodger.com/seneca-microservices-nodejs#.WMv5vBLyufd)

     Microservices should configure each other, and share information directly with each other, in a decentralized way.
     The problem with most of the current service discovery mechanisms is that they use a central point of control to
     manage the microservice system. Consider the drawbacks. The central registry can easily get out of date. Services
     come and go as they fail and restart, or as the system scales up or down. The registry may not know about all of
     the healthy services, and may direct clients to use unhealthy services. Detecting unhealthy services has to be done
     by heart-beating, but that is vulnerable to slow failures, where the service, under load, may just be taking longer
     to respond. All-in-all, centralized microservice configuration is tricky, and offers a valid criticism of the entire
     approach in production.

 4)   Start up the mesh base... (our main file setting up pattern for discovery)
      also contains user set up

      in  index-base-withservice-mesh.js

      .use('mesh',{"pin":"role:users,cmd:get"}
      $ npm run startMesh

      <b> NOTE that the index-base-mesh.js does not include port listening. </b>

 5)   Now  lets Start up the client that will set a mesh listener based on our strategy of
        discovery for get  in <b> (.use('mesh',{pin:"role:users,cmd:check"})) </b>

        client2-mesh.js

      $ npm run startMeshClient2

       .use('mesh',{pin:"role:users,cmd:check"})
        to find user with
       seneca.act({"role":"users","cmd":"get", "id":msg.id}

         discovering
         .use('mesh',{"pin":"role:users,cmd:get"})
         from  index-base-mesh.js

 6)   Now lets test it out with a curl call
        $ curl -d '{"role":"users","cmd":"check","id":1}' http://127.0.0.1:5000/act

            response

       {"user":{"id":1,"first_name":"Kathy","last_name":"Mills","email":"kmills0@ftc.gov","gender":"Female","ip_address":"124.142.224.135","checked":true}}

### now lets have our seneca mesh as a standalone base with no services

    <b> close terminal running index-base-withservice-mesh.js </b>


 7)   Start up the mesh base... (our main file setting up pattern for discovery) containing listener
       for index-accessible-mesh.js
         .use('mesh',{"pin":"role:users,cmd:get"})
         to get

       $  npm run startMeshAccessible


 8)  Start up the client that will set a mesh listener based on our strategy of
        discovery for get
        client2-mesh.js
      $ npm run startMeshClient3

        .use('mesh',{pin:"role:users,cmd:check"})

 9)    now lets test it out with a curl call
      $ curl -d '{"role":"users","cmd":"check","id":7}' http://127.0.0.1:5000/act

      response
         {"user":{"id":7,
                  "first_name":"Susan",
                   "last_name":"Lynch",
                   "email":"slynch6@latimes.com",
                   "gender":"Female",
                   "ip_address":"209.223.122.113",
                   "checked":true}}



 10) to check available services running lets run the curl

     $ curl -d '{"role":"mesh","get":"members"}' http://127.0.0.1:6000/act

      response

           {"list":[
           {"pin":["cmd:get,role:users"],
                     "port":55825,
                     "host":"0.0.0.0",
                     "type":"web",
                     "model":"actor",
                     "instance":"cslx6koleq0a/1489783774233/36172/3.3.0/-"},
           {"pin":["cmd:check,role:users"],
                      "port":53417,
                      "host":"0.0.0.0",
                      "type":"web",
                      "model":"actor","
                      instance":"xt006qj6jmf2/1489783830567/36303/3.3.0/-"}]}


##### now lets run the set up with Docker
