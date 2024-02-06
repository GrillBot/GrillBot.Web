import { Dictionary, ObservableDict } from './../../core/models/common';
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { SearchDataSource } from './models';
import { noop } from 'rxjs';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true
        }
    ]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor, OnChanges {
    @Input() searchSource?: SearchDataSource;
    @Input() isMultiSelect = false;
    @Input() guildId?: string;

    data: Dictionary<string, string>;
    selected: string | string[];
    disabled = false;

    private onTouched: () => void = noop;
    private onChange: (value: string | string[]) => void = noop;

    constructor(
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        if (!this.searchSource) {
            throw new Error('Error. Missing data source.');
        }

        this.initData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes) { return; }

        const reloadableTypes: SearchDataSource[] = [
            'channels',
            'roles',
            'channels-no-threads',
            'users-all',
            'users-no-bots',
            'users-only-bots'
        ];

        const canReload = reloadableTypes.includes(this.searchSource) && changes.guildId && !changes.guildId.firstChange;
        if (canReload) {
            this.initData();
        }
    }

    initData(): void {
        let request: ObservableDict<string, string>;
        switch (this.searchSource) {
            case 'guilds':
                request = this.dataService.getGuilds();
                break;
            case 'channels':
                request = this.dataService.getChannels(this.guildId, false);
                break;
            case 'roles':
                request = this.dataService.getRoles(this.guildId);
                break;
            case 'users-no-bots':
                request = this.dataService.getUsersList(false, this.guildId);
                break;
            case 'users-only-bots':
                request = this.dataService.getUsersList(true, this.guildId);
                break;
            case 'users-all':
                request = this.dataService.getUsersList(undefined, this.guildId);
                break;
            case 'channels-no-threads':
                request = this.dataService.getChannels(this.guildId, true);
                break;
            case 'public-api-methods':
                request = this.dataService.getPublicApiMethods();
                break;
        }

        request.subscribe(data => this.data = data);
    }

    writeValue(obj: string): void {
        this.selected = obj;
    }

    registerOnChange(fn: (_: string | string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onBlur(): void {
        this.onTouched();
    }

    onValueChanged(_: string | Dictionary<string, string>): void {
        this.onChange(this.selected);
    }
}
