import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public ShowHeader = true;

  randomLenght = 80
  sleepTime = 1;

  public maxCol = 4;
  public maxRow = -1;

  public currChosenElement: any;
  public currPlayerLenghPlaceholder = 1;

  public productionPath = "http://www.rudolf-chrispens.de/SSF-Angular"
  //public productionPath = "."

  public players: any[] = [
    {
      name: '',
      cols: 1,
      rows: 1,
      character: { name: 'None', playable: true, image: `${this.productionPath}/assets/None.jpg` },
      spareCharacter: { name: 'None', playable: true, image: `${this.productionPath}/assets/None.jpg` }
    },
  ];

  public characters: any[] = [
    { name: 'None', playable: true, image: `${this.productionPath}/assets/None.jpg` },
    { name: 'Daisy', playable: true, image: `${this.productionPath}/assets/Daisy.jpg` },
    { name: 'DK', playable: true, image: `${this.productionPath}/assets/DK.jpg` },
    { name: 'Luigi', playable: true, image: `${this.productionPath}/assets/Luigi.jpg` },
    { name: 'Mario', playable: true, image: `${this.productionPath}/assets/Mario.jpg` },
    { name: 'Peach', playable: true, image: `${this.productionPath}/assets/Peach.jpg` },
    { name: 'Wario', playable: true, image: `${this.productionPath}/assets/Wario.jpg` },
    { name: 'WarLuigi', playable: true, image: `${this.productionPath}/assets/WarLuigi.jpg` },
    { name: 'Yoshi', playable: true, image: `${this.productionPath}/assets/Yoshi.jpg` },
    //{ name: 'Toad', playable: false, image: `${this.productionPath}/assets/Toad.jpg` },
    //{ name: 'Koopa', playable: false, image: `${this.productionPath}/assets/Koopa.jpg` },
  ];

  public chooseFromListOfCharacters: any[] = [
    { name: 'Daisy', playable: true, image: `${this.productionPath}/assets/Daisy.jpg` },
    { name: 'DK', playable: true, image: `${this.productionPath}/assets/DK.jpg` },
    { name: 'Luigi', playable: true, image: `${this.productionPath}/assets/Luigi.jpg` },
    { name: 'Mario', playable: true, image: `${this.productionPath}/assets/Mario.jpg` },
    { name: 'Peach', playable: true, image: `${this.productionPath}/assets/Peach.jpg` },
    { name: 'Wario', playable: true, image: `${this.productionPath}/assets/Wario.jpg` },
    { name: 'WarLuigi', playable: true, image: `${this.productionPath}/assets/WarLuigi.jpg` },
    { name: 'Yoshi', playable: true, image: `${this.productionPath}/assets/Yoshi.jpg` },
    //{ name: 'Toad', playable: false, image: `${this.productionPath}/assets/Toad.jpg` },
    //{ name: 'Koopa', playable: false, image: `${this.productionPath}/assets/Koopa.jpg` },
  ];

  constructor() { }

  ngOnInit() {
  }

  addPlayer(playername: string) {
    this.players.push(this.createNewPlayer(playername, this.players.length % this.maxCol, Math.floor(this.players.length % this.maxCol)));
  }

  removePlayer() {
    if (this.players.length > 0) {
      this.players.pop();
    }
  }

  generateRandomChara(): any {

    if (this.chooseFromListOfCharacters.length <= 0) {
      this.chooseFromListOfCharacters = JSON.parse(JSON.stringify(this.characters.slice(1, this.characters.length)));
    }

    let randomIndex = (Math.floor(Math.random() * this.chooseFromListOfCharacters.length));

    const chosenChar = this.chooseFromListOfCharacters[randomIndex];

    const returnChar = { name: chosenChar.name, playable: chosenChar.playable, image: chosenChar.image };

    this.chooseFromListOfCharacters.splice(randomIndex, 1);
    return returnChar;
  }

  generateRandomSpare(player: any): any {

    if (this.chooseFromListOfCharacters.length <= 0) {
      this.chooseFromListOfCharacters = JSON.parse(JSON.stringify(this.characters.slice(1, this.characters.length)));
    }

    let randomIndex = (Math.floor(Math.random() * this.chooseFromListOfCharacters.length));

    let chosenChar = this.chooseFromListOfCharacters[randomIndex];

    //change to not get same char
    let deadlockFix = 0;
    if (chosenChar.name === player.character.name) {
      if (this.chooseFromListOfCharacters.length > 0 && this.chooseFromListOfCharacters[0].name !== player.character.name) {
        chosenChar = this.chooseFromListOfCharacters[0];
      } else if (this.chooseFromListOfCharacters.length > 1 && this.chooseFromListOfCharacters[1].name !== player.character.name) {
        chosenChar = this.chooseFromListOfCharacters[1];
      }
    }

    const returnChar = { name: chosenChar.name, playable: chosenChar.playable, image: chosenChar.image };

    this.chooseFromListOfCharacters.splice(randomIndex, 1);
    return returnChar;
  }

  async runRandomSelection() {

    let slowMo = 1 / this.randomLenght;
    this.ShowHeader = false;

    for (let j = this.randomLenght; j > 0; j--) {

      this.playAudio();

      for (let i = 0; i < this.players.length; i++) {
        this.players[i].character = this.generateRandomChara();
      }

      for (let i = 0; i < this.players.length; i++) {
        this.players[i].spareCharacter = this.generateRandomSpare(this.players[i]);
      }

      //reset the array now again#
      this.chooseFromListOfCharacters = [];

      await this.sleep(this.sleepTime * slowMo * 1000);
      if (j > 25) {
        slowMo = 0.05;
      } else if (j > 10) {
        slowMo = 1 / j;
      } else if (j < 2) {
        slowMo = 1.1;
      } else if (j < 4) {
        slowMo = 0.7;
      } else if (j < 6) {
        slowMo = 0.6;
      } else if (j < 8) {
        slowMo = 0.5;
      } else if (j < 10) {
        slowMo = 0.3;
      }

    }

    this.ShowHeader = true;
  }

  playAudio() {
    let audio = new Audio();
    audio.src = `${this.productionPath}/assets/audio/tick.wav`;
    audio.load();
    audio.play();
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createNewPlayer(playername: string, posCol: number, posRow: number): any {
    return {
      PlayerName: playername,
      cols: posCol,
      rows: posRow,
      character: this.characters[0],
      spareCharacter: this.characters[0],
    };
  }

  focusWritingSpace(event, player) {
    //set current focused element
    this.currChosenElement = player;
  }

  storePlayerNameIntoElement(event) {
    this.currChosenElement.name = event.target.value;
  }

  setPlayerCount(event) {

    let numb = Number(event.target.value);

    if (numb) {

      if (numb >= 128) {
        numb = 128;
      }

      while (this.players.length < numb) {
        this.addPlayer("");
      }

      while (this.players.length > numb) {
        this.players.pop();
      }

      this.currPlayerLenghPlaceholder = this.players.length;
    }
    else {
      console.error("Playercount not a Number!")
    }
  }
}
