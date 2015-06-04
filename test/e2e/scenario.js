// 'use strict';
//
// describe('Ofs App', function(){
// 	describe('ofs list view', function(){
// 		beforeEach(function(){
// 			browser.get('http://localhost:9000/#/well')
// 		});
//
// 		it('should filter the plants list', function(){
//
// 			var plantList = element.all(by.repeater('well in totalWell'));
// 			var query = element(by.model('query'));
//
// 			expect(plantList.count()).tobe(9);
//
// 			query.sendKey('ST. P. PLANT 1');
// 			expect(plantList.count()).tobe(1);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 2');
// 			expect(plantList.count()).tobe(2);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 3');
// 			expect(plantList.count()).tobe(3);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 4');
// 			expect(plantList.count()).tobe(4);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 5');
// 			expect(plantList.count()).tobe(5);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 6');
// 			expect(plantList.count()).tobe(6);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 7');
// 			expect(plantList.count()).tobe(7);
//
// 			query.clear();
// 			query.sendKey('ST. P. PLANT 8');
// 			expect(plantList.count()).tobe(8);
//
// 		});
//
// 		
// 	});
// });
