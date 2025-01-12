interface iDatabaseConnection {
    connect(): void;
    disconnect(): void;
}


class DatabaseConnection implements iDatabaseConnection{
    private static instance: DatabaseConnection;
    private dbConnect: boolean = false;

    private constructor(){}

    public static getInstance(): DatabaseConnection {
        if(!DatabaseConnection.instance){
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance
    }

    connect(): void {
        if(!this.dbConnect){
            this.dbConnect = true;
            console.log('Connection is set');
            
        }else{
            console.log('Connection is already set');
        }
    }

    disconnect(): void{
        if(!this.dbConnect){
            console.log('Connection is already disabled')
        }else{
            this.dbConnect = false;
            console.log('Connection is disabled')
        }
    }
}


const db1 = DatabaseConnection.getInstance();
db1.connect();           // Connection is set
db1.connect();           // Connection is already set
db1.disconnect();        // Connection is disabled
db1.disconnect();        // Connection is already disabled


export {DatabaseConnection}
    


    

