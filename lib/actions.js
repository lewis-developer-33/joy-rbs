"use server"
import {Model, User,Record} from '@/lib/models'
import connectDB from '@/lib/connect'
import {RuleEngine} from 'node-rules'

export const Apply = async (FormData) => {
    "use server"
    await connectDB()
    const model = await Model.findOne({name:"1"})
    const {minage,maxage,nationality,grade,sports,clubs,religion} = model
    const Userage = FormData.get('age')
    const Usernationality = FormData.get('nationality')
    const Usergrade = FormData.get('grade')
    const Usersports = FormData.get('sports')
    const Userclubs = FormData.get('clubs')
    const Userreligion = FormData.get('religion')

    let ans
    if (nationality.includes(Usernationality) ){
      if (Userage > minage && Userage <= maxage) {
          if (grade.includes(Usergrade)){
              if (religion.includes(Userreligion))
              {
                  ans = "You pass 1"
                  if (Usersports.length > 0 || Userclubs.length > 0){
                      ans = "you pass 2"
                  }
              }
              else ans="You no christian"
          }
          else{
              ans = "Grade no go"
          }
      }
      else{
          ans = "Fail age no good"    
      }
  }
  else{
      ans = "Fail not Kenyan"
  }
  await Record.create({
    name:"Leo33",
    age:Userage,
    nationality:Usernationality,
    grade:Usergrade,
    religion:Userreligion,
    results:ans
  })
  console.log(ans)
  return ans
  }

export const createModel = async () => {
    try {
        await connectDB()
        await Model.create({
            
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const checkEligibility = (FormData) => {
    const R = new RuleEngine();

    const adminRules = {
        nationality:"Kenyan",
        minAge:16,
        maxAge:23,
        maxIncome:20000,
        grades:['A','B'],
        religions:['Christian','Muslim']
    }

    const rule = [
        {
            condition: (R, fact) => {
            R.when(fact.nationality != adminRules.nationality);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your nationality is not ${adminRules.nationality}` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.age < adminRules.minAge && fact.age > adminRules.maxAge);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your age is not within our accepted range` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.income > adminRules.maxIncome);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your family income is above ${adminRules.maxIncome}` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(adminRules.grades[0] == R.grade || adminRules.grades[1] == R.grade);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your grade is below our acceptance level` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
                R.when(adminRules.religions[0] == R.religion || adminRules.religions[1] == R.religion);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your religion is not in our priorities` ;
            R.stop();
            },
        },
    ]


    R.register(rule);

    let fact = {
    age:FormData.get('age'),
    grade:FormData.get('grade'),
    religion:FormData.get("religion"),
    income:FormData.get("income"),
    nationality:FormData.get("nationality")
    };

    /* Check if the engine blocks it! */
    R.execute(fact, (data) => {
    if (data.result !== false) {
        console.log("Eligible for scholarship")
        return {message:"Eligible for scholarship"};
    } else {
        console.log("Ineligible for scholarship:" + data.reason)
        return {message:"Ineligible for scholarship:" + data.reason};
    }
    });
}