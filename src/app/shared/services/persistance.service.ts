import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export  class PersistanceService{
  set(key: string, data:any): void{
    try{localStorage.setItem(key,JSON.stringify(data))}
    catch(e)
    {console.error('Error saving to localStorage', e)

    }
  }

  get(key: string): any {
    const value = localStorage.getItem(key);

    if (value != null) {
      return JSON.parse(value);
    } else {
      console.error('Error getting data from localStorage');
      return null;
    }


  }
}
