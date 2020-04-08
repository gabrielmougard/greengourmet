package ggscanner.model;

public class Response {

    private int status = 200;
    private Item item = new Item();

    public Response (Item item){
        this.item = item;
    }
    public Response (){
    }
    public Item getItem(){
        return item;
    }
    public void setItem(Item item){
        this.item =  item;
    }
    public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
        this.status = status;
    }
}