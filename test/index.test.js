const axios2 = require("axios");


const BACKEND_URL = "http://localhost:3000"
const WS_URL = "ws://localhost:3001"

const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    get: async (...args) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    put: async (...args) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
}

// describe("Authenticartion",()=>{
//     test("User is able to sign up only once",async()=>{
//         const username  = "ankit" + Math.random();
//         const password = "1234456"

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type: "admin"
//         })

//         expect(response.status).toBe(200)

//         const response1 = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username,
//             password,
//             type: "admin"
//         })

//         expect(response1.status).toBe(400)
//     })
//     test("Signup request fails if the username is empty",async()=>{
//         const username = `Ankit-${Math.random()}` 
//         const password = "123456"

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             password,
//             type: "admin"
//         })
//         expect(response.status).toBe(400)
//     })


//     test("Sign in Successed if username and password is match",async()=>{
//         const username = "ankit"
//         const password = '123456'

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username,
//             password
//         })
//         expect(response.status).toBe(200)
//         expect(response.data.token).toBeDefined()
//     })

//     test('Signin fails if the username and password are incorrect', async() => {
//         const username = "ankit"
//         const password = "123456"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: "WrongUsername",
//             password
//         })

//         expect(response.status).toBe(400)
//     })
// })


// describe("User MetaData EndPoint",()=>{
//     let token ;
//     let avatarId;

//     beforeAll(async() => {
//         const username = `ankits-${Math.random()}`
//         const password = '12345'

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//            });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//          })

//         token = response.data.token


//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         },{
//             headers: {
//                 authorization: `Bearer ${token}`
//             }
//         })

//         console.log("avatarresponse is " + avatarResponse.data.avatarId)
//         avatarId = avatarResponse.data.avatarId;
//     })

//     test("User can't update their metadata with a wrong avatar id",async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//             avatarId: "123123123"
//         },{
//             headers: {
//                 "authorization": `Bearer ${token}`
//             }
//         })
//         expect(response.status).toBe(400)
//     })

//     test("User can update their metadata with a corret avatar id",async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
//             avatarId
//         },{
//             headers: {
//                 "authorization": `Bearer ${token}`
//             }
//         })
//         console.log(response.data)
//         expect(response.status).toBe(200)
//     })

//     test("User is not able to update their metadata if the auth header is not present", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatarId
//         })

//         expect(response.status).toBe(400)
//     })

// },15000)


// describe("User avatar information",()=>{
//     let avatarId;
//     let token;
//     let userId;

//     beforeAll(async () => {
//         const username = `Ankit+h${Math.random()}`
//         const password = "123456"
 
//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//          username,
//          password,
//          type: "admin"
//         });

//         userId = signupResponse.data.id
 
        
//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//          username,
//          password
//         })
 
//         token = response.data.token
 
//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//              "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//              "name": "Timmy"
//          }, {
//             headers: {
//                 authorization: `Bearer ${token}`
//             }
//          })
//          console.log("hii from avatarResponse")
//          console.log(avatarResponse.data)
//          avatarId = avatarResponse.data.avatarId;
//         //  console.log(avatarId)
        
//     })

//     test("Get back avatar information for a user", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`);
//         expect(response.data.avatars.length).toBe(1);
//         expect(response.data.avatars[0].userId).toBe(userId);
//     })

//     test("Available avatars lists the recently created avatar", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
//         // console.log(response.data)
//         expect(response.data.avatars.length).not.toBe(0);
//         const currentAvatar = response.data.avatars.find(x => x.id == avatarId);
//         expect(currentAvatar).toBeDefined()
//     })

// })


// describe("Space information",()=>{
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let adminToken;
//     let adminId;
//     let userToken;
//     let userId;

//     beforeAll(async()=>{
//         const username = `ankit<${Math.random()}`
//         const password = "123456"

         
//                 const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//                  username,
//                  password,
//                  type: "admin"
//                 });
        
//                 userId = signupResponse.data.id
         
                
//                 const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//                  username,
//                  password
//                 })
         
//                 adminToken = response.data.token
       



//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username:username + "-user",
//             password,
//             type:"user"
//         })

//         userId = userSignupResponse.data.userId


//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username + "-user",
//             password
//         })


//         userToken = userSigninResponse.data.token
       

//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         element1Id = element1Response.data.id
//         element2Id = element2Response.data.id
        

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "Test space",
//             "defaultElements": [{
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 }, {
//                   elementId: element1Id,
//                     x: 18,
//                     y: 20
//                 }, {
//                   elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//          }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//          })
//         mapId = mapResponse.data.id
//     })

//     test("User is able to create a space", async () => {

//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//           "name": "Test",
//           "dimensions": "100x200",
//           "mapId": mapId
//        }, {
//         headers: {
//             authorization: `Bearer ${userToken}`
//         }
//        })
//        expect(response.status).toBe(200)
//        expect(response.data.spaceId).toBeDefined()
//     })


//     test("User is able to create a space without mapId (empty space)", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//           "name": "Test",
//           "dimensions": "100x200",
//        }, {
//         headers: {
//             authorization: `Bearer ${userToken}`
//         }
//        })
//        expect(response.data.spaceId).toBeDefined()
//     })

//     test("User is not able to create a space without mapId and dimensions", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//           "name": "Test",
//        }, {
//         headers: {
//             authorization: `Bearer ${userToken}`
//         }
//        })

//        expect(response.status).toBe(400)
//     })

//     test("User is not able to delete a space that doesnt exist", async () => {
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`, {
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//        expect(response.status).toBe(400)
//     })

//     test("User is able to delete a space that does exist", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//         }, {
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const deleteReponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//        expect(deleteReponse.status).toBe(200)
//     })

//     test("User should not be able to delete a space created by another user", async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//         }, {
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const deleteReponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//        expect(deleteReponse.status).toBe(403)
//     })

//     test("Admin has no spaces initially", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });
//         expect(response.data.spaces.length).toBe(0)
//     })

//     test("Admin has gets once space after", async () => {
//         const spaceCreateReponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });
        
//         console.log(spaceCreateReponse.data)
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });
//         const filteredSpace = response.data.spaces.find(x => x.id == spaceCreateReponse.data.spaceId)
//         expect(response.data.spaces.length).toBe(1)
//         expect(filteredSpace).toBeDefined()

//     })
// })



describe("Arena endpoints", () => {
   
    let mapId;
    let element1Id;
    let element2Id;
    let adminToken;
    let adminId;
    let userToken;
    let userId;
    let spaceId;

    beforeAll(async () => {
        const username = `kirat-${Math.random()}`
        const password = "123456"
 
        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
         username,
         password,
         type: "admin"
        });

        adminId = signupResponse.data.id
 
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
         username: username,
         password
        })
 
        adminToken = response.data.token

        const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username: username + "-user",
            password,
            type: "user"
        });
   
        userId = userSignupResponse.data.id
    
        const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: username  + "-user",
            password
        })
    
        userToken = userSigninResponse.data.token

        const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
          "static": true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        });

        const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
          "static": true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })
        element1Id = element1Response.data.id
        element2Id = element2Response.data.id

        const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            name: "Default space",
            "defaultElements": [{
                    elementId: element1Id,
                    x: 20,
                    y: 20
                }, {
                  elementId: element1Id,
                    x: 18,
                    y: 20
                }, {
                  elementId: element2Id,
                    x: 19,
                    y: 20
                }
            ]
         }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
         })
         mapId = mapResponse.data.id

        const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
            "mapId": mapId
             }, {
            headers: {
                  authorization: `Bearer ${userToken}`
            }
            })
            spaceId = spaceResponse.data.spaceId
        
       
    },15000);


    test("Incorrect spaceId returns a 400", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/123kasdk01`, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });
        expect(response.status).toBe(400)
        console.log(spaceId)
    })
  
    test("Correct spaceId returns all the elements", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });
        console.log(response.data)

        expect(response.data.dimensions).toBe("100x200")
        expect(response.data.elements.length).toBe(3)
    })

    test("Delete endpoint is able to delete an element", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });
        console.log(response.data.elements)
        console.log(response.data.elements[0].id )

        let res = await axios.delete(`${BACKEND_URL}/api/v1/space/element`, {
            data: {id: response.data.elements[0].id},
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });

        console.log(response.data.elements)
        const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });

        expect(newResponse.data.elements.length).toBe(2)
    })

    test("Adding an element fails if the element lies outside the dimensions", async () => {
       const newResponse = await axios.post(`${BACKEND_URL}/api/v1/space/element`, {
            "elementId": element1Id,
            "spaceId": spaceId,
            "x": 10000,
            "y": 210000
        }, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });

        expect(newResponse.status).toBe(400)
    })

    test("Adding an element works as expected", async () => {
        await axios.post(`${BACKEND_URL}/api/v1/space/element`, {
            "elementId": element1Id,
            "spaceId": spaceId,
            "x": 50,
            "y": 20
        }, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });

        const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers: {
                "authorization": `Bearer ${userToken}`
            }
        });

        expect(newResponse.data.elements.length).toBe(3)
    })

})


// describe("Websocket tests", () => {
//     let adminToken;
//     let adminUserId;
//     let userToken;
//     let adminId;
//     let userId;
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let spaceId;
//     let ws1; 
//     let ws2;
//     let ws1Messages = []
//     let ws2Messages = []
//     let userX;
//     let userY;
//     let adminX;
//     let adminY;

//     function waitForAndPopLatestMessage(messageArray) {
//         return new Promise(resolve => {
//             if (messageArray.length > 0) {
//                 resolve(messageArray.shift())
//             } else {
//                 let interval = setInterval(() => {
//                     if (messageArray.length > 0) {
//                         resolve(messageArray.shift())
//                         clearInterval(interval)
//                     }
//                 }, 100)
//             }
//         })
//     }

//     async function setupHTTP() {
//     }
//     async function setupWs() {
//         ws1 = new WebSocket(WS_URL)

//         ws1.onmessage = (event) => {
//             console.log("got back adata 1")
//             console.log(event.data)
            
//             ws1Messages.push(JSON.parse(event.data))
//         }
//         await new Promise(r => {
//           ws1.onopen = r
//         })

//         ws2 = new WebSocket(WS_URL)

//         ws2.onmessage = (event) => {
//             console.log("got back data 2")
//             console.log(event.data)
//             ws2Messages.push(JSON.parse(event.data))
//         }
//         await new Promise(r => {
//             ws2.onopen = r  
//         })
//     }
    
//     beforeAll(async () => {
//         await setupHTTP()
//         await setupWs()
//     })

//     test("Get back ack for joining the space", async () => {
//         console.log("insixce first test")
//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": adminToken
//             }
//         }))
//         console.log("insixce first test1")
//         const message1 = await waitForAndPopLatestMessage(ws1Messages);
//         console.log("insixce first test2")
//         ws2.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": userToken
//             }
//         }))
//         console.log("insixce first test3")

//         const message2 = await waitForAndPopLatestMessage(ws2Messages);
//         const message3 = await waitForAndPopLatestMessage(ws1Messages);

//         expect(message1.type).toBe("space-joined")
//         expect(message2.type).toBe("space-joined")
//         expect(message1.payload.users.length).toBe(0)
//         expect(message2.payload.users.length).toBe(1)
//         expect(message3.type).toBe("user-joined");
//         expect(message3.payload.x).toBe(message2.payload.spawn.x);
//         expect(message3.payload.y).toBe(message2.payload.spawn.y);
//         expect(message3.payload.userId).toBe(userId);

//         adminX = message1.payload.spawn.x
//         adminY = message1.payload.spawn.y

//         userX = message2.payload.spawn.x
//         userY = message2.payload.spawn.y
//     })

//     test("User should not be able to move across the boundary of the wall", async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: 1000000,
//                 y: 10000
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws1Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("User should not be able to move two blocks at the same time", async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: adminX + 2,
//                 y: adminY
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws1Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("Correct movement should be broadcasted to the other sockets in the room",async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: adminX + 1,
//                 y: adminY,
//                 userId: adminId
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws2Messages);
//         expect(message.type).toBe("movement")
//         expect(message.payload.x).toBe(adminX + 1)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("If a user leaves, the other user receives a leave event", async () => {
//         ws1.close()
//         const message = await waitForAndPopLatestMessage(ws2Messages);
//         expect(message.type).toBe("user-left")
//         expect(message.payload.userId).toBe(adminUserId)
//     })
// })