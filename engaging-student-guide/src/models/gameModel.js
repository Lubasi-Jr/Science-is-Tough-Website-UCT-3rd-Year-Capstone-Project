export class gameModel{
    id;
    question;
    type;
    options;
    posx;
    posy;
    answer;

constructor(id,question,type,answer,options,posx,posy){
    this.id=id;
    this.question=question;
    this.type=type;
    this.options=options || [];
    this.answer=answer;
    this.position={ x: posx,y: posy};
    
 }
}