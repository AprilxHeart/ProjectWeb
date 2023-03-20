import { HttpHeaders } from "@angular/common/http";
import { HostListener, Injectable } from "@angular/core";
import { SESSION } from 'src/app/web/utill/constants';
@Injectable({
    providedIn: 'root'
})
export class Utility {

	getTotalPageFromTotalSize(itemPerPage: number , totalSize: number) {
        return Math.floor(totalSize / itemPerPage);
    }

	numberWithCommas(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    isEmpty(value: any): boolean {
        return value == '' || value == null || value == undefined;
    }

    generateRefId() {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < 10; i++) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result;
	}

	createAuthorizationHeader() {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem(SESSION.SESSION_ID),
			'X-session-Id' : '',
			'transactionId': this.generatorXSession()
		});
		let options = { headers: headers };
	    return options;

	}

	generatorXSession() {
		var result = '';
		var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var charactersLength = characters.length;
		var numChar = 5;
		for (var i = 0; i < numChar; i++) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	  }

	// Only AlphaNumeric with Some Characters [-_ ]
	@HostListener('document:keypress', ['$event'])
	keyPressAlphaNumericWithCharacters(event: KeyboardEvent) {

		//var inp = String.fromCharCode(event.keyCode);
		// Allow numbers, alpahbets, space, underscore
		if (/[a-zA-Z0-9-_ ]/.test(event.key)) {
		  return true;
		} else {
		  event.preventDefault();
		  return false;
		}
	  }



  // Only AlphaNumeric
  @HostListener('document:keypress', ['$event'])
  keyPressAlphaNumeric(event: KeyboardEvent) {

    //let inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(event.key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


    calculateDiffDate(startDate:string,endDate:string){

        let diffStartDate = new Date(startDate);
        let diffEndDate = new Date(endDate);

        return Math.floor((Date.UTC(diffEndDate.getFullYear(), diffEndDate.getMonth(), diffEndDate.getDate()) - Date.UTC(diffStartDate.getFullYear(), diffStartDate.getMonth(), diffStartDate.getDate()) ) /(1000 * 60 * 60 * 24));
    }





}
