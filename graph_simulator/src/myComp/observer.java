package myComp;

public interface observer {
	public void update(observed observed);

	public void updateAction(observed observed, int a);

	public void sub(observed o);

}
