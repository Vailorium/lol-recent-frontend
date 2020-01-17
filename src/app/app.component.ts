import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import $ from 'jquery';
import { ChampionDTO } from 'src/dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lol-recent-frontend';

  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.form = this.fb.group({
      summonerName: ['',[Validators.required]]
    });
  }

  public getChampionRotation = async () => {
    this.http.get('http://localhost:3000/api/champion-rotation/', {}).subscribe((val) => {
      console.log(val);
    });
  }

  public getSummonerDetails = async () => {
    const val = this.form.value;
    console.log(val);
    this.http.post('http://localhost:3000/api/summoner-details/', {summonerName: this.form.value.summonerName}).subscribe((val) => {
      console.log(val);
      $("#data").text(JSON.stringify(val));
    });
  }

  public getChampionMastery = async () => {
    const val = this.form.value;
    this.http.post('http://localhost:3000/api/champion-masteries/', {summonerName: this.form.value.summonerName}).subscribe((val: ChampionDTO[]) => {
      // let parsedVal = JSON.parse(val);
      let counter = 0;
      for(let champion of val){
        counter += champion.championPoints;
      }
      console.log(counter);
      $("#data").text(`Summoner ${this.form.value.summonerName} has ${counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Mastery Points Overall!`);
    });
  }
}
