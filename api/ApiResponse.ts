
enum Status {
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

class ApiResponse {
    
    public data: any;
    public status: Status;
    public message: string;

    constructor(data: any, status: Status, message: string) {
        this.data = data;
        this.status = status;
        this.message = message;
    }


}

export default ApiResponse;