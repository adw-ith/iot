export interface Component{
    name:string;
    number:number;
    borrowers:{
        membership_id:string,
        number:number  
    }[];
}
export interface User{
    name:string;
    email:string;
    password:string;
    membership_id:string;
    requested_components:{
        name:string;
        number:number;
    }[];
    borrowed_components:{
        name:string;
        number:number;
    }[];
}

export interface Request{
    component_name:string;
    number:number;
    membership_id:string;
}