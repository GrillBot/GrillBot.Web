import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    getStorage(useSession: boolean): Storage {
        return !useSession ? localStorage : sessionStorage;
    }

    read<TItem>(key: string, useSession: boolean = false): TItem | null {
        const data = this.getStorage(useSession).getItem(key);
        return data ? JSON.parse(data) as TItem : null;
    }

    remove(key: string, useSession: boolean = false): void {
        this.getStorage(useSession).removeItem(key);
    }

    store<TITem>(key: string, item: TITem, useSession: boolean = false): void {
        this.getStorage(useSession).setItem(key, JSON.stringify(item));
    }

    clear(useSession: boolean = false): void {
        this.getStorage(useSession).clear();
    }
}
