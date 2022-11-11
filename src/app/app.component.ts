import { Component } from '@angular/core';
import { funcCollatz, objCollatzStats } from './collatz';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'collatz';
    objArray: objCollatzStats[] = [];

    handleInput(bigSeed: bigint) {
        for (let i: number = 0; i < this.objArray.length; i++) {
            if (bigSeed === this.objArray[i].seed) {
                console.log('input repeat detected!');
            }
        }
        const res: objCollatzStats = funcCollatz(bigSeed);
		this.objArray.push(res);
        console.log(res);
	}
}
