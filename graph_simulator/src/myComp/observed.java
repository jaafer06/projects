package myComp;

public interface observed {
	public int getAction();

	public state getState();

	public void forceSteady();

	public void setFocus(boolean b);

	public int getContainer();

	public void setContainer(int c);

}
