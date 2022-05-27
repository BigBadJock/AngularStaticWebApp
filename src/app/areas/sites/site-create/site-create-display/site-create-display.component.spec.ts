import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { createComponentFactory, Spectator } from "@ngneat/spectator/jest";
import { MockComponent } from "ng-mocks";
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SiteCreateDisplayComponent } from "./site-create-display.component";

describe('SiteCreateDisplayComponent', () => {
  let spectator: Spectator<SiteCreateDisplayComponent>;
  let mockAppCard = MockComponent(CardComponent);
  const createComponent = createComponentFactory(
    {
      component: SiteCreateDisplayComponent,
      declarations: [mockAppCard],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormBuilder]
    });

  beforeEach(() => spectator = createComponent());

  test('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  test('form shoud be invalid when empty', () => {
    spectator.component.siteForm.controls.siteName.setValue('');
    spectator.component.siteForm.controls.noOfPlots.setValue('');
    expect(spectator.component.siteForm.valid).toBeFalsy();
  });

  test('siteName - a blank should return a required error', () => {
    const { siteName } = spectator.component.siteForm.controls;
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('');
    expect(siteName.hasError('required')).toBeTruthy();
  });

  test('siteName - a too short siteName should return a minlength error', () => {
    const { siteName } = spectator.component.siteForm.controls;
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('a');
    expect(siteName.hasError('minlength')).toBeTruthy();
  });

  test('siteName - a too long siteName should return a maxLength error', () => {
    const { siteName } = spectator.component.siteForm.controls;
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    expect(siteName.hasError('maxlength')).toBeTruthy();
  });
  
  test('noOfPlots - a blank should return a required error', () => {
    const { noOfPlots } = spectator.component.siteForm.controls;
    expect(noOfPlots.valid).toBeFalsy();

    noOfPlots.setValue('');
    expect(noOfPlots.hasError('required')).toBeTruthy();
  });

  test('noOfPlots - less than 1 should return a min error', () => {
    const { noOfPlots } = spectator.component.siteForm.controls;
    expect(noOfPlots.valid).toBeFalsy();

    noOfPlots.setValue('0');
    expect(noOfPlots.hasError('min')).toBeTruthy();
  });
  
  test('noOfPlots - greater than 250 should return a max error', () => {
    const { noOfPlots } = spectator.component.siteForm.controls;
    expect(noOfPlots.valid).toBeFalsy();

    noOfPlots.setValue('251');
    expect(noOfPlots.hasError('max')).toBeTruthy();
  });
  
  test('save button - should be disabled if form is invalid', () => {
    spectator.component.siteForm.controls.siteName.setValue('');
    spectator.component.siteForm.controls.noOfPlots.setValue('');
    const buttonDE = spectator.query('#saveButton');
    
    expect(spectator.component.siteForm.valid).toBeFalsy();
    expect(buttonDE.getAttribute('disabled')).toBeDefined;
  });
  
  test('save button - should be enabled if form is valid', () => {
    spectator.component.siteForm.controls.siteName.setValue('test 1');
    spectator.component.siteForm.controls.noOfPlots.setValue('1');
    const saveButton = spectator.query('#saveButton');
    
    expect(spectator.component.siteForm.valid).toBeTruthy();
    expect(saveButton.getAttribute('disabled')).toBeUndefined;
  });
  
  test('saveSite() should be called when Save button is clicked', () => {
    const onClickSpy = jest.spyOn(spectator.component, 'saveSite');
    const saveButton = spectator.query<HTMLButtonElement>('#saveButton');
    const el = spectator.fixture.debugElement.query(By.css('#saveButton'));
    el.triggerEventHandler('click', null);
    spectator.fixture.detectChanges();
    expect(saveButton).toBeDefined();
    expect(saveButton.innerHTML).toEqual('Save');

    expect(onClickSpy).toBeCalledTimes(1);
  });

  test('save button - emits form value when clicked', () => {
    const emitSpy = jest.spyOn(spectator.component.formSubmitted,'emit');

    spectator.component.siteForm.controls.siteName.setValue('test 1');
    spectator.component.siteForm.controls.noOfPlots.setValue('1');
    spectator.component.saveSite();

    spectator.detectChanges();
    

    expect(emitSpy).toHaveBeenCalledWith(spectator.component.siteForm.value);
  });  

});
