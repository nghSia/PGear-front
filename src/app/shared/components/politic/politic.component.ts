import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-politic',
  templateUrl: './politic.component.html',
  styleUrls: ['./politic.component.scss']
})
export class PoliticComponent{

  private v_acceptClicked = false;

  acceptClick(){
    this.v_acceptClicked = true;
    console.log(this.v_acceptClicked);
  }
}
