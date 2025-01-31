import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'datnek-app-formly-field-intervenant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-group">
      <label>{{ to.label }}</label>
      <div class="input-group">
        <div class="selected-options" *ngFor="let option of selectedOptions">
          <span class="selected-option">
            <img [src]="option.photo" alt="Photo de {{ option.name }}" class="avatar">{{ option.name }}
            <button (click)="removeOption(option)">x</button>
          </span>
        </div>
        <input
          type="text"
          [formControl]="formControl"
          class="form-control"
          (focus)="onFocus()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          placeholder="Rechercher ou ajouter un intervenant"
        />
      </div>
      <div class="dropdown-menu dropdown-multi-select show" *ngIf="showDropdown">
        <button class="dropdown-item" *ngFor="let option of filteredOptions" (click)="selectOption(option)">
          <img [src]="option.photo" alt="Photo de {{ option.name }}" class="avatar">{{ option.name }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .form-group {
      position: relative;
    }
    .dropdown-menu {
      position: absolute;
      z-index: 1000;
      left: 0;
      transform: translateX(-200px); 
      bottom: 43px; /* Ajuster pour positionner le menu */
      float: left;
      margin-right: 20px;
      min-width: 10rem;
      padding: .5rem 0;
      margin: 0;
      font-size: 1rem;
      color: #212529;
      text-align: left;
      list-style: none;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, .15);
      border-radius: .50rem;
    }
    .dropdown-item {
      display: flex;
      align-items: center;
      padding: .25rem 1.5rem;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .selected-options {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-right: 10px;
      background-color: #e9ecef;
      padding: 2px 8px;
      border-radius: 15px;
      margin-top: 5px;
    }
    .selected-option button {
      margin-left: 5px;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  `]
})
export class IntervenantTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  showDropdown = false;
  selectedOptions: Array<{ name: string, photo: string }> = [];
  filteredOptions: Array<{ name: string, photo: string }> = [];

  intervenants = [
    { name: 'Iron Man', photo: 'assets/ironman.jpg' },
    { name: 'Captain America', photo: 'assets/captainamerica.jpg' },
    { name: 'Black Widow', photo: 'assets/blackwidow.jpg' },
    { name: 'Hulk', photo: 'assets/hulk.jpg' },
    { name: 'Captain Marvel', photo: 'assets/captainmarvel.jpg' }
  ];

  ngOnInit() {
    this.filteredOptions = this.intervenants;
  }

  onFocus() {
    this.showDropdown = true;
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.filteredOptions = this.intervenants.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
      if (value && !this.filteredOptions.find(opt => opt.name === value)) {
        this.filteredOptions.push({ name: value, photo: 'assets/default.jpg' }); // Utiliser une photo par défaut
      }
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  selectOption(option: { name: string, photo: string }) {
    const alreadySelected = this.selectedOptions.find(opt => opt.name === option.name);
    if (!alreadySelected) {
      this.selectedOptions.push(option);
      this.formControl.setValue(this.selectedOptions.map(opt => opt.name));
    }
    this.showDropdown = false;
  }

  removeOption(option: { name: string, photo: string }) {
    this.selectedOptions = this.selectedOptions.filter(opt => opt !== option);
    this.formControl.setValue(this.selectedOptions.map(opt => opt.name));
  }
}
