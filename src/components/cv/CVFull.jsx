import CVPersonal from "./CVPersonal"
import CVExperience from "./CVExperience"
import CVEducation from "./CVEducation"
import CVLanguages from "./CVLanguages"
import CVSkills from "./CVSkills"
import CVOther from "./CVOther"

export default function CVFull() {
  return (
    <>
      <CVPersonal />
      <CVExperience />
      <CVEducation />
      <CVLanguages />
      <CVSkills />
      <CVOther />
    </>
  )
}
