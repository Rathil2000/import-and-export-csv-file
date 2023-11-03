const XLSX = require("xlsx");
const Users = require("../models/userModel");
const outputPath = "storage/outputs";

exports.index = async (req,res)=>{
    const users = await Users.findAll();
    return res.render("index",{users});
};

exports.import = async (req,res)=>{
    const wb = XLSX.readFile(req.file.path);
    const sheets = wb.SheetNames;

    if(sheets.length>0){
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const users = data.map(row =>({
            name:row["name"],   
            email:row["email"],
            address:row["address"],
            age:row["age"]
        }));
        await Users.bulkCreate(users)
    }
    res.send({data:"added successfully"})
};

exports.export= async (req,res)=>{
    const users = await Users.findAll({
        attributes:["id","name","email","address","age"],
        raw:true
    });

    const headings=[["Id","Name","Email","Address","Age"]];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users, {
        origin:"A2",
        skipHeader: true
    });

    XLSX.utils.sheet_add_aoa(ws,headings);
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const buffer = XLSX.write(wb , {bookType: "csv", type:"buffer"});
    res.attachment("users.csv");
    return res.send(buffer);
}