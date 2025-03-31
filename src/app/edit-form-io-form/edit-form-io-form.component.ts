import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Formio } from '@formio/angular';

@Component({
  selector: 'app-edit-form-io-form',
  templateUrl: './edit-form-io-form.component.html',
  styleUrls: ['./edit-form-io-form.component.scss'],
})
export class EditFormIoFormComponent implements OnInit {

  /**
   * 
   * DevNitesh
   * projectURl  'https://wkfavwmrcptwbxk.form.io'
   *  "data": {
          "email": "Dev1Nitesh1@gmail.com",
          "password": "Dev1Nitesh1@123"
      }
          x-token : 'tjPxzVXUMWcYJRw50yieUJu5utdY4R'
   */

          /**
           * 
           * formIoTesting : 
           * projectUrl: https://iljaicdivgoculu.form.io
           * {
              "data": {
                "email": "FormIoTestingUser@gmail.com",
                "password": "FprmIoTestingPwd@34!2*"
              }
            }
           * x-token: IGBDCaKAB6yOk2NYz4iHsE20xjiu9k
           * 
           */

            /**
             * ResourceChecking
             * projectUrl: https://exvxyvtexvbhblx.form.io
             * 
             * 
             * x-token: pFjPfZyP0MGvQeVV4iwHtF1rlzp9HH
             * 
             */
  projectUrl = 'https://exvxyvtexvbhblx.form.io'; // Your Form.io project URL
  projectToken = ''; // = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3YTc1YjVkYzRhMTMwYWU3MTdlMDg5YiJ9LCJpc3MiOiJodHRwczovL2FwaS5mb3JtLmlvIiwic3ViIjoiNjdhNzViNWRjNGExMzBhZTcxN2UwODliIiwianRpIjoiNjdhNzViYzQzMmFhMzFhZWE4OTc1ODkyIiwiaWF0IjoxNzM5MDIxMjUyLCJleHAiOjE3NzUzMDkyNTJ9.UrYGQ3lpBpwENyEypZBPyuzdpMBnBHEnprQOYmBHiNo';
  jwtToken: string | null = null;
  finalResource:any;
  availableResources:any;
  editablePdfComponents :any;
  editablePdfSettings:any;
  xApiToken='pFjPfZyP0MGvQeVV4iwHtF1rlzp9HH';
  forms: any[] = [];
  selectedFormSchema: any = null;
  selectedFormId: string | null = null;
  showAll = false;
  formTitle: string = '';
  formName: string = '';
  formPath: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadJwtToken();
    this.loadForms();
  }

  loadJwtToken(): void {
    const loginPayload = {
      "data": {
        "email": "ResourceUser@gmail.com",
        "password": "ResourceUser1@123"
    }
    };

    this.http
      .post(this.projectUrl + '/user/login', loginPayload, {
        observe: 'response',
      })
      .subscribe(
        (response: HttpResponse<any>) => {
          const token = response.headers.get('x-jwt-token'); // Retrieve token from response headers
          if (token) {
            this.projectToken = token;
            localStorage.setItem('jwtToken', this.projectToken); // Store the token for later use
            this.loadForms(); // Load forms after retrieving token
          } else {
            console.error('JWT token not found in response headers.');
          }
        },
        (error) => {
          console.error('Error retrieving JWT token', error);
        }
      );

      this.http.get(this.projectUrl+'/form?type=resource', { headers: { 'x-jwt-token': this.projectToken } })
    .subscribe((resources: any[]) => {
      this.availableResources = resources ;

      let arr = [];
      resources.filter(x=> x.name != 'user').filter(y=>y.name != 'admin').forEach((i,z)=>{
        
        
          let obj = {title: i.title,
                weight: 10,
                components: i.components}
          arr.push(obj);
      } );


      let newObj = this.convertJson(arr);
      // const transformedObject = arr.reduce((acc, item, index) => {
      //   acc[`custom${index === 0 ? '' : index}`] = item;
      //   return acc;
      // }, {});

// let variablex = {title: 'inBuiltResource',
//   weight:10,
//   components : newObj
// }
      //  this.finalResource = variablex;
      this.finalResource = newObj

      // resources.map(resource => ({
      //   label: resource.title,
      //   key: resource.name,
      //   form: resource._id // Store resource ID for later use
      // }));
      // console.log('Available Resources:', this.availableResources);
    }, error => {
      console.error('Error fetching resources:', error);
    });
  }
  loadForms(): void {
    // https://nbmalbxhdiruwaq.form.io/form?tags=""'
    this.http
      .get(this.projectUrl + '/form?tags=hiddenOther', {
        headers: { 'x-jwt-token': this.projectToken },
      })
      .subscribe((data: any) => {
        this.forms = data;
      });
  }

   convertJson(sourceJson) {
    const result =  { builder: {
    } };

    // let result : {builder:{
    //   'customBuiler':{title:'inBuiltComponent',weight:10,components:{}};
    // }}

    // result =  { builder: {
    //   title:'indbuilt',
    //   weight:10,
    //   components:[]
    // } };
  
    sourceJson.forEach((section, index) => {
      const customKey = `custom${index !== 0 ? index : ''}`;
      const customSection = {
        title: section.title,
        weight: section.weight,
        components: []
      };
  
      section.components.forEach(component => {
        if(component.key?.toLowerCase() != 'submit'){
          const componentKey = component.key;
          customSection.components[componentKey] = {
            title: component.label,
            key: component.key,
            icon: 'terminal', // assuming icon for simplicity
            // schema: {
            //   label: component.label,
            //   type: component.type,
            //   key: component.key,
            //   input: component.input
            // }
            schema:component
          };
        }
          
      });
   
      // result.builder['customBuiler']['components'][customKey] = customSection; 
      // result.builder.components.push(customSection);

      
      result.builder[customKey] = customSection;




    });
  
    return result;
  }

  onTitleChange(): void {
    // Convert title to 'niteshUserPdfffff1ss3' format
    let formattedTitle ='';
    formattedTitle =  this.formTitle
      .replace(/\s+/g, '')
      .replace(/([A-Z])/g, (match) => match.toLowerCase());

    // Update name and path with the formatted title
    this.formName = formattedTitle;
    this.formPath = this.projectUrl + '/' + formattedTitle;
  }
  loadForm(form: any): void {
    this.selectedFormSchema = form;
    this.selectedFormId = form._id;
    this.formTitle = form.title;
    this.formPath =this.projectUrl +'/'+ form.name;
    this.formName = form.name;

    // if(form.display == 'pdf'){
    //   this.selectedFormSchema['settings'] = form?.settings ? form.settings :null ;
    //   this.selectedFormId['pdfComponents'] = form?.pdfComponents ? form.pdfComponents : [];
    // }
    this.renderFormBuilder(form.type,'edit',form.display,form );
  }

  createNewForm(type: 'form' | 'pdf'): void {
     
    this.selectedFormSchema = { display: type, components: []
      // ,  settings: {
      // // resources: [
      // //   {
      // //     name: "resourcecheck",
      // //     reference: true,  // Allows referencing an existing resource
      // //   }
      // // ]

      // resources: this.availableResources 
    // } 
  };
    this.selectedFormId = null;
    this.renderFormBuilder(type,'add');
  }

  renderFormBuilder(type: any, mode: any,display?:any,form?:any): void {
    document.getElementById('formio-builder').innerHTML = '';
    this.showAll = true;
    Formio.setProjectUrl(this.projectUrl);
    Formio.setToken(this.projectToken);


    if (mode == 'add'){
      this.formName = '';
      this.formTitle = '';
      this.formPath = '';
      this.selectedFormSchema = [];
    }
    let finalFormSettings = mode == 'edit' ? form: {
      display:display?? type,components: this.selectedFormSchema ,  settings: {
        resources: [
          {
            name: "resourcecheck",
            reference: true,  // Allows referencing an existing resource
          }
        ]
      }
    
    };
    
    Formio.builder(document.getElementById('formio-builder'), 
    // {
    //   display:display,
      
    //   components: this.selectedFormSchema ,
    // }
    finalFormSettings
    ,
   this.finalResource
  ).then((builder) => {
      builder.on('change', () => {
        console.log('Form schema:', builder.schema);
      });

      builder.on('saveComponent', (event) => {
        console.log('Component saved:', event);
      });

      document.getElementById('save-FormIO-button').addEventListener('click', () => {
        const formSchema = builder.schema;
        console.log('Form schema to be saved:', formSchema);

        formSchema['title'] = this.formTitle;
        formSchema['type'] = 'form';
        formSchema['name'] = this.formName;
        formSchema['path'] = this.formName;
        formSchema['tags'] = 'hiddenOther';
        this.publishFormToFormIo(formSchema, mode);
      });
    });
  }

  publishFormToFormIo(formSchema, mode: any) {
    let finalUrl =
      mode == 'edit'
        ? this.projectUrl + '/form/' + this.selectedFormId
        : this.projectUrl + '/form';

        let finalHeaders = mode =='edit' ? {
          'Content-Type': 'application/json',
         'x-token': this.xApiToken // Authenticate the request with your API token
        } : 
         {
        'Content-Type': 'application/json',
      'x-jwt-token': this.projectToken// Authenticate the request with your API token
      }
    fetch(finalUrl, {
      method: mode == 'edit' ? 'PUT' : 'POST',
      headers: finalHeaders,
      body: JSON.stringify(formSchema),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to publish form: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Form published successfully:', data);
        this.showAll = false;
        this.selectedFormId = null;
        this.selectedFormSchema = null;  
        this.formName = '';
        this.formPath = '';
        this.formTitle = '';
        this.loadForms();
        alert('Form published successfully!');
        document.getElementById('formio-builder').innerHTML = ''
      })
      .catch((error) => {
        console.error('Error publishing form:', error);
        alert('Error publishing form. Check the console for details.');
      });
  }

  // saveForm(): void {
  //   const url = this.selectedFormId
  //     ? `https://wkfavwmrcptwbxk.form.io/form/${this.selectedFormId}`
  //     : 'https://wkfavwmrcptwbxk.form.io/form';

  //   const method = this.selectedFormId ? 'put' : 'post';

  //   this.http
  //     .request(method, url, {
  //       body: { components: this.selectedFormSchema },
  //       headers: { 'x-jwt-token': this.projectToken },
  //     })
  //     .subscribe(() => {
  //       alert('Form saved successfully!');
  //       this.loadForms();
  //     });
  // }
}
