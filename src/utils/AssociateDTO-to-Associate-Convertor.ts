import { AssociateDTO } from "../dtos/associate-dto";
import { Associate } from "../models/Associate";
import { Flag } from "../models/Flag";
// import { getBookById } from "../remote/google-books/get-book-by-id";

// // works perfectly with the map function
// export async function BookDTOtoBookConvertor( bto:BookDTO):Promise<Book>{
//     let genre:Genre[] = [];
//     for(const g of bto.genres){
//         genre.push({genreId:0, genre:g})// this si a problem to solve in the future
//     }
//     let googData = await getBookById(bto.google_id)
//     return {
//         ISBN: bto.ISBN.toString(),
//         authors:bto.authors,
//         genre,
//         bookId:bto.book_id,
//         chapters:bto.chapters,
//         pages:bto.pages,
//         numberInSeries:bto.number_in_series,
//         publisher:bto.publisher,
//         publishingDate: bto.publishing_date.getFullYear(),
//         series:bto.series,
//         title:bto.title,
//         averageRating:googData.volumeInfo.averageRating,
//         numberOfRatings:googData.volumeInfo.ratingsCount,
//         image:googData.volumeInfo.imageLinks.thumbnail

//     }
// }