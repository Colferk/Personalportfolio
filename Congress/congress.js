import { senators } from '../Data/senators'
import { representatives} from '../Data/representatives'

const members = [...senators, ...representatives]

console. log (members.length)

const senatorDiv = document.querySelector('.senators')

