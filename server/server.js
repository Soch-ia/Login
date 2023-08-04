import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import fetch from 'node-fetch'
import path from 'path'

const app = express();

const corsOptions ={
      origin:'http://localhost:3000', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../build");

app.use(express.static(buildPath))

app.get("/*", function(req,res){
    res.sendFile(
        path.join(__dirname, "../build/index.html"),
        function(err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "R00t@my5ql",
    database: 'project01'
}).promise()



app.post("/totp", async (req,res)=> {

    const { email, password, token } = req.body;

    

    async function getUUID(email, password) {
        const [rows] = await db.query(`
        SELECT uuid
        FROM project01.client
        WHERE email = ?
        AND password = ?
        `, [email, password])
        return rows[0].uuid
    }

    const uuid = await getUUID(email, password)   

    const data = {
        uuid: uuid,
        token: token
    }

    async function getToken(data) {
        const response = await fetch('https://d3microservices.traxx.sg/mfa/api/client/verifyByToken', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer 1281eec6-075d-45a0-8279-daf04586e7e8',
                'Content-Type': 'application/json'
            }),
            
            
            body: JSON.stringify(data)

        });
        console.log("data: ", data);
        const newdata = await response.json();
        return newdata
    }

    var x = await getToken(data)

    console.log(x)

    if (x.result == true) {
        var viable = 1;
    } else {
        var viable = 0;
    }

    res.json({ viable });
    console.log(viable)
})

app.post("/code", async (req,res)=> {

    const { email, password, code } = req.body;

    console.log('req.body: ', req.body)

    async function getCode(email, password) {
        const [rows] = await db.query(`
        SELECT code
        FROM project01.client
        WHERE email = ?
        AND password = ?
        `, [email, password])
        return rows[0].code
    }

    const sqlCode = await getCode(email, password)

    console.log(sqlCode)

    if (sqlCode == code) {
        var validity = 1;
    } else {
        var validity = 0;
    }

    res.json({ validity });
    console.log(validity)
})

app.post("/test", async (req,res)=> {

    const { email, password, checkMethod } = req.body;

    console.log('req.body: ', req.body)

    async function getLogin(email) {
        const [rows] = await db.query(`
        SELECT password
        FROM project01.client
        WHERE email = ?
        `, [email])
        return rows[0].password
    }

    async function getUUID(email) {
        const [rows] = await db.query(`
        SELECT uuid
        FROM project01.client
        WHERE email = ?
        `, [email])
        return rows[0].uuid
    }

    const ello = await getLogin(email)
    const uuid = await getUUID(email)   
    
    const data = {
        uuid: uuid
    }

    async function getCode(data) {
        const response = await fetch('https://d3microservices.traxx.sg/mfa/api/client/verifyByEmail', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer 1281eec6-075d-45a0-8279-daf04586e7e8',
                'Content-Type': 'application/json'
            }),
            
            
            body: JSON.stringify(data)

        });
        console.log("data: ", data);
        const newdata = await response.json();
        
        console.log(newdata.result.code)    
 
        async function addCode(code, uuid) {       
            const [insertcode] = await db.query(`
            UPDATE project01.client 
            SET code = ? 
            WHERE uuid = ? 
            
            `, [code, uuid])

        }
        

        addCode(newdata.result.code, uuid)

    }

    if (checkMethod === 1) {
        const code = getCode(data)   
        console.log("getCode")
    }
    
    

    if (ello == password) {
        var valid = 1;
    } else {
        var valid = 0;
    }

    res.json({ valid });
    console.log("ello: ", ello)
    console.log("password: ", password)
    console.log("valid: ", valid)
})

app.post("/create", async (req, res) => {

    const { name, email, password } = req.body;

    async function getClient(id) {
        const [rows] = await db.query(`
        SELECT *
        FROM project01.client
        WHERE id = ?
        `, [id])
        return rows[0]
    }
    
    async function createClient(name, email, password) {
        const [result] = await db.query(`
        INSERT INTO project01.client (name, email, password)
        VALUES (?, ?, ?)
        `, [name, email, password])
        const id = result.insertId
        return getClient(id)
        
    }


    createClient(name,email,password)
    // console.log (result)

    const data = {
        name: name,
        email: email
    }

    console.log ("data:", data)

    async function addClient(data) {
        const response = await fetch('https://d3microservices.traxx.sg/mfa/api/manager/createClient', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer 1281eec6-075d-45a0-8279-daf04586e7e8',
                'Content-Type': 'application/json'
            }),
            
            
            body: JSON.stringify(data)

        });
        console.log(data);
        const newdata = await response.json();
        
        console.log(newdata.result.uuid);
        
        async function addUUID(uuid, name, email) {       
            const [insertuuid] = await db.query(`
            UPDATE project01.client 
            SET uuid = ? 
            WHERE name = ? 
            AND email = ?
            
            `, [uuid, name, email])

        }
        
        await addUUID(newdata.result.uuid, newdata.result.name, newdata.result.email)

    }
    
    await addClient(data);

    async function getUUID(email, password) {
        const [rows] = await db.query(`
        SELECT uuid
        FROM project01.client
        WHERE email = ?
        AND password = ?
        `, [email, password])
        return rows[0].uuid
    }

    const uuid = await getUUID(email, password)   

    console.log("first check:", uuid)

    const otherdata = {
        uuid: uuid,
        account: "App Name"
    }

    async function getSecret(otherdata) {
        const response = await fetch('https://d3microservices.traxx.sg/mfa/api/client/createSecret', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer 1281eec6-075d-45a0-8279-daf04586e7e8',
                'Content-Type': 'application/json'
            }),
            
            
            body: JSON.stringify(otherdata)

        });
        console.log("otherdata: ", otherdata);
        const newdata = await response.json();

        //post to sql
        async function addQR(qr, uuid) {       
            const [insertqr] = await db.query(`
            UPDATE project01.client 
            SET qr = ? 
            WHERE uuid = ? 
            
            `, [qr, uuid])

        }
        console.log("newdata: ", newdata)

        await addQR(newdata.result.qr, uuid)

        async function addURI(uri, uuid) {       
            const [inserturi] = await db.query(`
            UPDATE project01.client 
            SET uri = ? 
            WHERE uuid = ? 
            
            `, [uri, uuid])

        }
        
        await addURI(newdata.result.uri, uuid)

    }

    await getSecret(otherdata)

    async function getQR(email, password) {
        const [rows] = await db.query(`
        SELECT qr
        FROM project01.client
        WHERE email = ?
        AND password = ?
        `, [email, password])
        return rows[0].qr
    }

    async function getURI(email, password) {
        const [rows] = await db.query(`
        SELECT uri
        FROM project01.client
        WHERE email = ?
        AND password = ?
        `, [email, password])
        return rows[0].uri
    }

    const sqlQR = await getQR(email, password)
    const sqlURI = await getURI(email, password)

    console.log("qr:", sqlQR)
    console.log("uri:", sqlURI)

    res.json({sqlQR, sqlURI});
});


