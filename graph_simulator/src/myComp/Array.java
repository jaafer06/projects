package myComp;

import java.awt.List;
import java.util.ArrayList;
import java.util.Arrays;

public class Array extends ArrayList<normalButton> {

	public ArrayList<normalButton> getButton(int a) {
		ArrayList<normalButton> list = new ArrayList<>();
		for (int i = 0; i < this.size(); ++i) {
			if (this.get(i).getAction() == a)

				list.add(this.get(i));

		}

		return list;
	}

}
