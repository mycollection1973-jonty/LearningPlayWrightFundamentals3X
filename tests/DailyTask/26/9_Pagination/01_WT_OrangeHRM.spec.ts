// 26-09-2026
// need to work with pagination 
import {test,expect} from '@playwright/test';

test('Verify the delete person from the list', async({ page }) =>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

    //login
    let userName = await page.locator("input[name='username']").fill("Admin");
    let password = await page.locator("input[name='password']").fill("admin123");
    let login = await page.locator("button[type='submit']").click();
    
    // Go to PMI
    const PIMLink = await page.locator("//span[text()='PIM']").click();

    // Add person
    const faf = await page.getByRole('button', {name : 'Add'}).click();
    let firstName = await page.getByPlaceholder("First Name").fill("Dev");
    let middleName = await page.getByPlaceholder("Middle Name").fill("Singh");
    let lastName = await page.getByPlaceholder("Last Name").fill("Meena");
    let empId = await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill("800014");
    let save = await page.getByRole('button', {name : 'Save'}).click();
    //await page.waitForTimeout(5000);

    // Go to Employee list
    await page.locator("a.oxd-topbar-body-nav-tab-item").filter({ hasText : 'Employee List'}).click();

    // await page.waitForSelector("div.oxd-table-row");
    // const text : string[] = await page.locator("div.oxd-table-cell").allInnerTexts();
    // console.log(text.join(" ").includes("Mahesh"));  
    // console.log(text.length)  ;
    
    // Delete by Search method
    let searchBar = await page.getByPlaceholder("Type for hints...").nth(0).fill("Gopal");
    let search =await page.getByRole('button',{name : 'Search'}).click();
    let deletePerson = await page.locator("i.oxd-icon.bi-trash").click();
    //let confirm = await page.getByRole('button', {name :' Yes, Delete '}).click();
     
    let row;

    // while(true)
    // {
    //     row = page.locator("div.oxd-table-card").filter({ hasText : "Gopal "});
    //     console.log("Row count:", await row.count());
    //     if( await row.count() > 0)
    //     {
    //         console.log("Gopal Found");
    //         //const remove  = await row.locator(".oxd-icon.bi-trash").click();          
    //         break;
    //     }
       
    //   const nextPage = page.locator("button[class='oxd-pagination-page-item oxd-pagination-page-item--previous-next']").nth(1);
    //     console.log("Next button count", await nextPage.count());  
    //      if(await nextPage.isDisabled())
    //     {
    //         throw new Error ("Row Not Found!!!");
    //     }

    //     // console.log("Next count:", await nextPage.count());
    //     // console.log("Disabled:", await nextPage.isDisabled());
    //     // console.log("Visible:", await nextPage.isVisible());
    //     await nextPage.click();
        
        
        
    //}
    // let row;
    // while (true){
    //   row = page.locator("div.oxd-table-card").filter({ hasText: "Gopal" });

    //   if (await row.count())
    //   {
    //      break;
    //   }
    //   const nextbutton= page.locator("//ul[@class='oxd-pagination__ul']//li[last()]//button")
    //   const nextCount = await nextbutton.count();
      
    //   if (nextCount === 0) {
    //    throw new Error("name not found");
    //   }
    
    //   await  nextbutton.click();
      
    //  // await page.waitForTimeout(500);
      

    // }


   
    
    // await row.locator("button i.bi-trash").click();

   //  let deleteCheck = await page.locator("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']").nth(1).click();

    await page.pause();
});