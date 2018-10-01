module.exports = {
    viewAll: (app, req, res) => {
        app.get('toDoDb').collection('list').find({}).toArray((err, docs)=>{
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
    viewSingle: (app,req,res) => {
        let listID = parseInt(req.params.listID);
        app.get('toDoDb').collection('list').find({"listID":listID}).toArray((err,docs)=>{
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
    addListItem: (app, req, res) => {
        let newListItem = req.body;
        let listID = parseInt(newListItem.listID);
        newListItem.listID = listID;

        app.get('toDoDb').collection('list').insertOne(newListItem, (err,docs) => {
            if (err) {
                console.error(err)
            }
            res.json({"msg":"Successful"})
        })
    },
    editList: (app,req,res) => {
        let ammendListItem = req.body;
        let listID = parseInt(ammendListItem.listID);
        
        app.get('toDoDb').collection('list').updateOne(
            {"listID":listID},
            {
                $set: {
                    "dateAdded": ammendListItem.dateAdded,
                    "dateForCompletion":dateForCompletion,
                    "listCategory":listCategory,
                    "listItem":listItem,
                    "listPriority":listPriority
                }
            },
            (err, dbResp) => {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount===1) {
                    res.json({msg:"successfully amended"})
                } else {
                    res.json({msg:"Not Found"})
                }
            }
        )
    },

    deleteListItem: (app,req,res) => {
        let removeListItem =req.body;
        let listID = parseInt(removeListItem.listID);
        app.get('toDoDb').collection('list').deleteOne(
            {"listID": listID},
            (err, dbResp) => {
                if (err) {
                    console.error(err)
                }
                if (dbResp.deleteCount ===1){
                    res.json({msg:"Successfully Removed"})
                } else {
                    res.json({msg: "Not Found"})
                }
            }
        )
    }


}