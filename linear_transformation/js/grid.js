class Grid extends Group {
  constructor() {
    super();
    this.play_animation = false;
    this.animation_duration = 80;
    this.grid_size_mult = 3;
    this.stacked_transformation = [1, 0, 0, 1];
    this.reset_matrix = [1, 0, 0, 1];
    this.accumulate_transformation = false;
    this.first = true;
    this.unitVector = new Point(view.size.width/20, view.size.width/20);
    this.inital_state = true;

     this.target_matrix = [1, 0, 0, 1];
     //this.target_matrix = [0.2, 0, 0.1 , 0.2];
    //this.target_matrix = [1, -1, 0.000001, 0.00001];
    //this.target_matrix = [-1.5, -1.5, 1.5, 1];

    this.inverse_array = [];

    // this.angle = -math.pi/4;
    // this.target_matrix = [math.cos(this.angle), math.sin(this.angle),
    //                       -math.sin(this.angle), math.cos(this.angle)];
    this.inverse = new Matrix(1, 0, 0, 1, 0, 0);
    this.current_trans = new Matrix();
    this.ind = 0;
    this.unit_rectangle = new Path();
    this.matrix = new Matrix(1, 0, 0, 1, 0 ,0);
    this.fixed_grid = new Path();

    this.rotation_angle = 0.5;
    super.onFrame = this.onFrame;
    this.center = new Point(view.size.width/2, view.size.height/2);
    this.i = new Vector(this.center, new Point(this.center.x+this.unitVector.x,
              this.center.y));
    this.j = new Vector(this.center, new Point(this.center.x,
              this.center.y-this.unitVector.y));

    this.i.set_style(3, "green");
    this.j.set_style(3, "red");

    this.set_up_fixed();
    this.setup_grid();
    this.setup_unit_rectangle();
    this.addChild(this.i);
    this.addChild(this.j);
    this.bringToFront();
  }
  reset() {
    if(this.inital_state||this.play_animation) {
      return;
    }
    this.stacked_transformation = [1, 0, 0, 1];
    this.target_matrix = this.reset_matrix;
    this.inverse.set(1, 0, 0, 1, 0, 0);
    this.ind = 0;
    this.play_animation = true;
    this.inital_state = true;
  }

  apply_matrix(matrix) {

    if(this.play_animation) {
      return;
    }
    if(!this.check_invertable(matrix)){
      matrix[0]+=0.001;
      matrix[3]+=0.001;
    }
    this.inital_state = false;
    this.stacked_transformation = this.multiply(this.stacked_transformation, matrix);
    this.reset_matrix = this.get_inverse(this.stacked_transformation);

    this.inverse.set(1, 0, 0, 1,0 ,0);
    this.target_matrix = matrix;
    this.ind = 0;
    this.play_animation = true;
  }

  onFrame(event) {
    if(this.play_animation) {
      if(this.ind == this.animation_duration+1) {
        this.play_animation = false;
        return;
      }
      var previous = this.position;
      this.position.x = 0;
      this.position.y = 0;

      super.transform(this.inverse);
      var mm = this.get_partial(this.target_matrix, this.ind, this.animation_duration);
      this.current_trans.set(...mm, 0, 0);
      this.inverse_array = this.get_inverse(mm);
      this.inverse.set(...this.get_inverse(mm), 0, 0);
      this.ind+=1;
      super.transform(this.current_trans);
      this.position = previous;
    }
  }

  get_partial(m, index, max_index) {
    let rate = index/max_index;
    return [1+(m[0]-1)*(rate), m[1]*(rate), m[2]*(rate), 1+(m[3]-1)*(rate)];
  }
  get_inverse(m) {
    var result = math.inv([[m[0],m[2]],[m[1], m[3]]]);
    return [result[0][0], result[1][0], result[0][1], result[1][1] ];
  }

  check_invertable(matrix) {
    try {
      get_inverse(matrix);
      return true;
    } catch(err) {
      return false;
    }
  }
  set_up_fixed() {
        for(var i = 0; i < view.size.height; i+=this.unitVector.y/2) {
            var point1 = new Point(0, i);
            var point2 = new Point(view.size.width, i);
            var axe = new Path();
            axe.add(point1);
            axe.add(point2);
            axe.strokeColor = "white";
            axe.strokeColor.alpha = 0.5;
            axe.strokeWidth = 0.3;
            this.fixed_grid.addChild(axe);
        }

        for(var i = 0; i < view.size.width; i+=this.unitVector.x/2) {
            var point1 = new Point(i, 0);
            var point2 = new Point(i, view.size.height);
            var axe = new Path();
            axe.add(point1);
            axe.add(point2);
            axe.strokeColor = "white";
            axe.strokeColor.alpha = 0.5;
            axe.strokeWidth = 0.3;
            this.fixed_grid.addChild(axe);
        }

        for(var i = 0; i < view.size.height; i+=this.unitVector.y) {
            var point1 = new Point(0, i);
            var point2 = new Point(view.size.width, i);
            var axe = new Path();
            axe.add(point1);
            axe.add(point2);
            axe.strokeColor = "white";
            axe.strokeColor.alpha = 1;
            axe.strokeWidth = 0.4;
            this.fixed_grid.addChild(axe);
        }

        for(var i = 0; i < view.size.width; i+=this.unitVector.x) {
            var point1 = new Point(i, 0);
            var point2 = new Point(i, view.size.height);
            var axe = new Path();
            axe.add(point1);
            axe.add(point2);
            axe.strokeColor = "white";
            axe.strokeColor.alpha = 1;
            axe.strokeWidth = 0.4;
            this.fixed_grid.addChild(axe);
        }
  }

  setup_unit_rectangle() {
    this.unit_rectangle.add(this.i.segments[0]);
    this.unit_rectangle.add(this.i.segments[1]);
    this.unit_rectangle.add(this.i.segments[1].point.x, this.j.segments[1].point.y);
    this.unit_rectangle.add(this.j.segments[1]);

    this.unit_rectangle.fillColor = "yellow";
    this.unit_rectangle.fillColor.alpha = 0.3;
    this.addChild(this.unit_rectangle);
  }

  multiply(matrix1, matrix2) {
    let m1 = [[matrix1[0], matrix1[2]],[matrix1[1], matrix1[3]]];
    let m2 = [[matrix2[0], matrix2[2]],[matrix2[1], matrix2[3]]];
    let result = math.multiply(m1, m2);
    return [result[0][0], result[1][0], result[0][1], result[1][1] ];
  }

  set_up_unit_vectors() {
    this.i.strokeColor = "green";
    this.j.strokeColor = "red";
    this.i.add(this.center);
    this.i.add(this.center.x+this.unitVector.x, this.center.y);
    this.j.add(this.center);
    this.j.add(this.center.x, this.center.y-this.unitVector.y);
    this.i.strokeWidth = 2;
    this.j.strokeWidth = 2;
    this.addChild(this.i);
    this.addChild(this.j);
  }

  setup_grid() {
    for(var i = (1-this.grid_size_mult)*view.size.height; i <= view.size.height*this.grid_size_mult; i+=this.unitVector.y) {
        var point1 = new Point((1-this.grid_size_mult)*view.size.width, i);
        var point2 = new Point(this.grid_size_mult*view.size.width, i);
        var axe = new Path();
        axe.add(point1);
        axe.add(point2);
        axe.strokeColor = "#375E97";
        if(i == this.view.size.height/2) {
          axe.strokeColor = "white";
        }
        axe.strokeWidth = 2.5;
        this.addChild(axe);
    }

    for(var i = (1-this.grid_size_mult)*view.size.width; i <= view.size.width*this.grid_size_mult; i+=this.unitVector.x) {
        var point1 = new Point(i, (1-this.grid_size_mult)*view.size.height);
        var point2 = new Point(i, this.grid_size_mult*view.size.height);
        var axe = new Path();
        axe.add(point1);
        axe.add(point2);

        axe.strokeColor = "#375E97";
        if(i == this.view.size.width/2) {
          axe.strokeColor = "white";
        }
        axe.strokeWidth = 2.5;
        this.addChild(axe);
    }

  }
}
