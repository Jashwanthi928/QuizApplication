class Question
{
  constructor(q,a,b,c,d,qset,qid){
    this.q=q;
    this.a=a;
    this.b=b;
    this.c=c;
    this.d=d;
    this.qset=qset;
    this.qid=qid;
  }
}
module.exports = (app, db) => {
  let noq=10;
//  get random questions
app.get('/ranQue',(req,res)=>{
    let getQandO=[];
            for(let i=1;i<=noq;i++){
              db.findOne({"q_set":"per"},{projection:{"_id":0,"questions":{$elemMatch:{"qid":i}}}},(err, result) => {
                  if (err)
                      console.log(err + " this error has occured");
                  else {
                      let ques=result.questions[0];
                      let qando=new Question(ques.question,ques[1],ques[2],ques[3],ques[4],"per",ques.qid);
                      console.log("Questions picked from DataBase "+i);
                      getQandO.push(qando);
                  }
                  if(getQandO.length===noq)
                  {
                    let qoJson=JSON.stringify(getQandO);
                    res.send(qoJson);
                  }
              });
            }
          });


  //check answer
  app.post('/checkAns',(req,res)=>{
    let point=0;
      let reqData=req.body;
      for(let i=0;i<noq;i++){
            if(reqData[i].ans!==null && reqData[i].q_set!==null && reqData[i].qid!==null && reqData[i].opid!==null){
              db.findOne({"q_set":reqData[i].q_set},{projection:{"_id":0,"questions":{$elemMatch:{"qid":reqData[i].qid}}}},(err,result)=>{
                if (err)
                    console.log(err + " this error has occured");
                else {
                  let qans=result.questions[0];
                        if(qans.ans===reqData[i].ans)
                        {
                         point+=1;
                         console.log(point);
                        }
                        if(i===noq-1)
                        {
                        res.send(String(point));
                        console.log("p"+point);
                        }
                }
              });
            }
            console.log("i: "+i);
      }
  });
};
